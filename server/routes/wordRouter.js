const Router = require("express");
const router = new Router();
const { check } = require("express-validator");

const wordController = require("../controllers/wordController");

router.get("/wordlists/:userid", wordController.getWordListsByUser);
router.get("/wordlist/:id", wordController.getWordListById);

router.post("/wordlist", wordController.addWordList);
router.delete("/wordlist/:id", wordController.deleteWordList);
router.patch("/wordlist/:id", wordController.updateWordList);

module.exports = router;
