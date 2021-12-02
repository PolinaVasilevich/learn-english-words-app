const mongoose = require("mongoose");

const User = require("../models/User");
const WordList = require("../models/WordList");

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
      const wordList = await WordList.findOne({ _id: id });

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

      res
        .status(201)
        .json({ message: "Word list has created", data: newWordList });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Error! Try again" });
    }
  }

  async deleteWordList(req, res) {
    try {
      const { id } = req.params;
      const wordList = await WordList.findByIdAndDelete({ _id: id });

      return res.json({
        message: `${wordList.name} were deleted successfully!`,
        data: wordList,
      });
    } catch (error) {
      res.status(500).json({ message: "Error delete list" });
    }
  }
}

module.exports = new wordController();
