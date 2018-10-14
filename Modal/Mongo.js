const mongoose = require("mongoose");
const Day = require("dayjs");
const Schema = mongoose.Schema;

const MongoSchema = new Schema({
  path: String,
  filename: String,
  date: { type: Date, default: Date.now },
});

MongoSchema.path("date").get((value) => {
  return Day(value).format("YYYY-MM-DD HH:mm:ss");
});

const Mongo = mongoose.model("mongo", MongoSchema);

module.exports = Mongo;
