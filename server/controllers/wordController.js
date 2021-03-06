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

      await newWordList.save();

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
      res.status(500).json({ message: "Can't delete this list. Try again" });
    }
  }

  async updateWordList(req, res) {
    try {
      const { id } = req.params;
      const { wordid } = req.body;

      await WordList.updateOne(
        {
          _id: new mongoose.Types.ObjectId(id),
        },
        { $set: { "words.$[e1].isLearned": true } },

        {
          arrayFilters: [{ "e1._id": new mongoose.Types.ObjectId(wordid) }],
        }
      );

      res.json({ message: "This word was updated" });
    } catch (error) {
      res.status(500).json({ message: "Error update word list" });
    }
  }

  async addWordInWordList(req, res) {
    try {
      const { id } = req.params;
      const word = req.body;

      const wordList = await WordList.findOne({ id });

      if (!wordList) {
        return res
          .status(404)
          .json({ message: `Wordlist with id ${id} doesn't exist` });
      }

      await WordList.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            words: word,
          },
        }
      );

      res.json({
        message: "Your new word has added in a wordlist",
      });
    } catch (err) {
      res.status(500).json({ message: "Error for adding a new word" });
    }
  }
}

module.exports = new wordController();
