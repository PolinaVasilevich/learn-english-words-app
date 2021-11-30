const Router = require("express");
const router = new Router();
const { check } = require("express-validator");

const wordController = require("../controllers/wordController");

router.post(`/words/:userid`, word);

module.exports = router;
