"use strict";
var mongoose = require("mongoose");

var gamesSchema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  game_num: { type: Number, default: 1 },
  game_round: { type: Number, default: 0 },
  num_of_cards: { type: Number, default: 0 },
  players: [
    {
      name: String,
      surname: String,
      total_score: { type: Number, default: 0 },
      current_bet: { type: Number, default: 0 },
      rounds: []
    }
  ]
});

var Games = mongoose.model("Games", gamesSchema);
module.exports = Games;
