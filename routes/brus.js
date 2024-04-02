const express = require("express");
const router = express.Router();
const db = require("../models");
const BrusService = require("../services/BrusService");
const brusService = new BrusService(db);

router.get("/", async function (req, res, next) {
  const brus = await brusService.getAllBrus();
  res.json({ brus: brus });
});

router.post("/", async function (req, res, next) {
  const brus = await brusService.createBrus(req.body);
  res.json({ brus: brus });
});

module.exports = router;
