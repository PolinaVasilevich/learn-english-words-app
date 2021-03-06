const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "USER" },
  wordList: [{ type: Schema.ObjectId, ref: "wordList" }],
});

module.exports = model("User", UserSchema);
