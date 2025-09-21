const express = require("express");
const Score = require("../models/Score");

const router = express.Router();

// Create new match
router.post("/", async (req, res) => {
  const score = new Score(req.body);
  await score.save();
  res.json(score);
});

// Get all matches
router.get("/", async (req, res) => {
  const scores = await Score.find();
  res.json(scores);
});

// Update score
router.put("/:id", async (req, res) => {
  const score = await Score.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(score);
});

module.exports = router;
