const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../models");
const BrusService = require("../services/BrusService");
const brusService = new BrusService(db);
const { decodeJWT } = require("../middleware/decodeToken");

router.get("/", decodeJWT, async function (req, res, next) {
  const brus = await brusService.getAllBrus();
  const orders = await brusService.calculateTotalBrus(req.userId);
  res.render("brus", { userId: req.userId, brus: brus, orders: orders });
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
  const brus = await brusService.orderBrus(req.userId, quantity);
  res.json({ brus: brus });
});

module.exports = router;
