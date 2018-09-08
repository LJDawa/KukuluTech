const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var membersSchema = new Schema({
  name: String,
  surname: String,
  images: String,
  top_score: Number
});

module.exports = Members = mongoose.model("members", membersSchema);
