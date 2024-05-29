const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../models");
const BrusService = require("../Services/BrusService");
const brusService = new BrusService(db);
const { decodeJWT } = require("../middleware/decodeToken");
const { checkUser } = require("../middleware/checkUser");

router.get("/", decodeJWT, checkUser, async function (req, res, next) {
  const brus = await brusService.getAllBrus();
  const orders = await brusService.calculateTotalBrus(req.userId);
  res.render("brus", {
    users: req.user,
    userId: req.userId,
    brus: brus,
    orders: orders,
  });
});

router.get("/total", decodeJWT, async function (req, res, next) {
  const totalBrus = await brusService.calculateTotalBrus(req.userId);
  res.json({ totalBrus: totalBrus });
});

router.post("/", async function (req, res, next) {
  const brus = await brusService.createBrus(req.body);
  res.json({ brus: brus });
});

router.post("/order", decodeJWT, async function (req, res, next) {
  const quantity = req.body.quantity;
  const totalBrus = req.body.totalBrus;
  const brus = await brusService.orderBrus(req.userId, quantity, totalBrus);
  res.json({ brus: brus });
});

module.exports = router;
