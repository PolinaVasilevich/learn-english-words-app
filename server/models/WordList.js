const { Schema, model } = require("mongoose");

const WordListSchema = new Schema({
  name: { type: String, required: true, unique: true, default: "text" },
  words: [{ type: Schema.ObjectId, ref: "Word" }],
  user: { type: Schema.ObjectId, ref: "User" },
});

module.exports = model("WordList", WordListSchema);
