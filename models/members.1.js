"use strict";
var mongoose = require("mongoose");

var membersSchema = mongoose.Schema({
  name: String,
  surname: String,
  images: String,
  top_score: Number
});

var Members = mongoose.model("Members", membersSchema);
module.exports = Members;
