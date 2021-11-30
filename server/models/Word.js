const { Schema, model } = require("mongoose");

const WordSchema = new Schema({
  word: { type: String, required: true },
  translate: { type: String, required: true },
  definition: { type: String, required: true },
  pronunciation: { type: String },
  example: { type: String },
});

module.exports = model("Word", WordSchema);
