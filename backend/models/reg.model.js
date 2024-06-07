const mongoose = require("mongoose");

const regSchema = mongoose.Schema({
  fullName: String,
  email: String,
  pass: String,
});

module.exports = mongoose.model("reg", regSchema);
