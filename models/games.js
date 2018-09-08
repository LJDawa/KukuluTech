const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gamesSchema = new Schema({
  game_num: Number,
  game_round: Number,
  num_of_cards: Number,
  players: [
    {
      player: {
        type: Schema.Types.ObjectId,
        ref: "members"
      },
      total_score: Number,
      current_bet: Number
    }
  ],
  rounds: [
    {
      player: {
        type: Schema.Types.ObjectId,
        ref: "members"
      },
      round: Number,
      score: Number,
      bet: Number,
      actual: Number,
      deduction: Number
    }
  ],
  date: { type: Date, default: Date.now }
});

module.exports = Games = mongoose.model("games", gamesSchema);
