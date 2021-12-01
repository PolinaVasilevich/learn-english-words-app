const mongoose = require("mongoose");

const User = require("../models/User");
const WordList = require("../models/WordList");
const Word = require("../models/Word");

class wordController {
  async getWordListsByUser(req, res) {
    try {
      const { userid } = req.params;
      const wordLists = await WordList.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userid),
          },
        },
      ]);

      res.json(wordLists);
    } catch (e) {
      res.status(500).json({ message: "Error! Try again" });
    }
  }

  async getWordListById(req, res) {
    try {
      const { id } = req.params;
      const wordList = await WordList.findOne({ id });

      res.json(wordList);
    } catch (e) {
      res.status(500).json({ message: "Error! Try again" });
    }
  }

  async addWordList(req, res) {
    try {
      const { name, words, user } = req.body;

      const wordList = await WordList.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(user.id),
            name,
          },
        },
      ]);

      if (wordList.length) {
        return res
          .status(400)
          .json({ message: `You have word list with name ${name}` });
      }

      const newWordList = new WordList({
        name,
        words,
        user: user.id,
      });

      newWordList.save();

      res.status(201).json({ message: "Word list has created" });
    } catch (e) {
      return res.status(500).json({ message: "Error! Try again" });
    }
  }
}

module.exports = new wordController();
