const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../models/User");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect registration data",
        });
      }

      const { email, password, role } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "A user the same name already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 5);

      const user = new User({ email, password: hashedPassword, role });
      user.save();

      const token = generateJwt({ id: user.id, email, role: user.role });

      res.status(201).json({ message: "User has created", token });
    } catch (e) {
      res.json(500).json({ message: "Error! Try again" });
    }
  }

  async login(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect login data ",
        });
      }
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ message: "User with this email is not found" });
      }

      const comparePassword = await bcrypt.compareSync(password, user.password);

      if (!comparePassword) {
        return res.status(400).json({ message: "Wrong password. Try again" });
      }

      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (e) {
      res.status(500).json({ message: "Error! Try again" });
    }
  }

  async check(req, res) {
    const { user } = req;
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
