const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  courtId: { type: String, required: true },
  player1: { type: String, required: true },
  player2: { type: String, required: true },
  score1: { type: Number, default: 0 },
  score2: { type: Number, default: 0 }
});

module.exports = mongoose.model("Score", scoreSchema);
