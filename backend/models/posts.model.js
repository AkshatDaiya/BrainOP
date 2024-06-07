const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  name: String,
  title: String,
  desc: String,
  img: String,
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("posts", postSchema);
