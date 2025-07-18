const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(500).send("User Already Exist");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({ name, username, email, password: hashedPassword });
    if (createdUser) {
      const token = jwt.sign({ userId: createdUser._id }, JWT_SECRET, { expiresIn: "7d" });
      res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      return res.status(201).send(createdUser);
    }
    res.send("Something went wrong");
  } catch (error) {
    res.status(400).json({
      message: "Something wrong with controller !!"
    });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        message: "Please enter email and password"
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        message: "Not a user, Please sign up"
      });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
      res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      return res.status(200).json({
        message: "Login Successfull"
      });
    }
    res.status(404).json({
      message: "Password Incorrect !!"
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong !!"
    });
  }

}

const profileController = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId).select("-password");
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(400).json({
        message: "Something went wrong !!!!"
      })
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

module.exports = {
  register,
  login,
  profileController
}
