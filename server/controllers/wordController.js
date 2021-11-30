const User = require("../models/User");
const WordList = require("../models/WordList");
const Word = require("../models/Word");

class wordController {
  async createWordList(req, res) {
    try {
      const { userid } = req.params;

      const user = await User.findById({ userid });

      if (!user) {
        return res.status(400).json({
          message: `User with id ${userid} does not exist!`,
        });
      }

      const { words } = req.body;

      console.log(words);

      //   const newWords = new Word({ ...words });

      //   await newWords.save();

      //   const newWordList = new WordList({ name: "test", words: newWords });

      //   await newWordList.save();

      res.status(201).json({ message: "Word list has created", token });
    } catch (e) {
      res.json(500).json({ message: "Error! Try again" });
    }
  }
}

module.exports = new wordController();
