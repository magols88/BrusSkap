var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models");
const UserService = require("../services/UserService");
const userservice = new UserService(db);
const { checkUser } = require("../middleware/checkUser");

/* GET users listing. */
router.get("/login", checkUser, function (req, res, next) {
  res.render("login", { users: req.user, title: "Login" });
});

router.post("/signup", async function (req, res, next) {
  try {
    const { name, username, email, password, team } = req.body;
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await userservice.createUser(
      name,
      username,
      email,
      hashedPassword,
      team
    );
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.json({ message: "User signed up", token: token });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "User could not be created", error: error.message });
  }
});

router.post("/login", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await userservice.getUserByUsername(username);
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "24h",
        }
      );
      res.cookie("jwt", token, { httpOnly: true });
      res.json({ message: "User logged in", token: token });
    } else {
      res.status(400).json({ message: "Wrong password" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "User could not be logged in" });
  }
});

router.get("/logout", function (req, res, next) {
  res.clearCookie("jwt");
  res.redirect("/login");
});

module.exports = router;
