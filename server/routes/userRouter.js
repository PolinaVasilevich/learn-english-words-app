const Router = require("express");
const router = new Router();
const { check } = require("express-validator");

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/registration",
  [
    check("password", "Min 3 characters").isLength({ min: 3 }),
    check("email", "Email cannot be empty").notEmpty(),
  ],
  userController.registration
);
router.post(
  "/login",
  [
    check("email", "Enter email").exists(),
    check("password", "Enter password").exists(),
  ],
  userController.login
);
router.get("/auth", authMiddleware, userController.check);

module.exports = router;
