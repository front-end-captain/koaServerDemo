const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  type: Number,
  date: { type: Date, default: Date.now },
  description: String,
  log: String,
});

const Log = mongoose.model("log", LogSchema);

module.exports = Log;
