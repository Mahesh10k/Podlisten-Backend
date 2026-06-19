const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: "user" },
  password: { type: String, required: true },
  favourites: [String],
  uploads: [String],
});

module.exports = mongoose.model("User", UserSchema);
