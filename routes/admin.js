const express = require("express");
const router = express.Router();
const db = require("../models");
const UserServices = require("../Services/UserService");
const userServices = new UserServices(db);
const BrusService = require("../Services/BrusService");
const brusService = new BrusService(db);

/* GET admin page. */
router.get("/", async function (req, res, next) {
  const users = await userServices.getAllUsers();

  // Add a new property to each user for the total brus
  for (let user of users) {
    user.totalBrus = await brusService.calculateTotalBrus(user.id);
  }
  res.render("admin", { title: "Admin", users: users });
});

router.delete("/betalt/:userId", async function (req, res, next) {
  const userId = req.params.userId;
  await userServices.betaltBrus(userId);
  res.json({ success: true });
});

router.delete("/delete/:userId", async function (req, res, next) {
  const userId = req.params.userId;
  await userServices.deleteUser(userId);
  res.json({ success: true });
});

module.exports = router;
