const { Schema, model } = require("mongoose");

const WordListSchema = new Schema({
  name: { type: String, required: true },
  words: [
    {
      word: String,
      definition: String,
      translate: String,
      pronunciation: String,
      example: String,
    },
  ],
  user: { type: Schema.ObjectId, ref: "User" },
});

module.exports = model("WordList", WordListSchema);
