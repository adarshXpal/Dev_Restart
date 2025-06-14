const express = require("express");
const userModel = require("../models/user.model");
const router = express.Router();
const cookieParser = require("cookie-parser");
const { registerUser, loginUser, logout } = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");
  res.render("cart", { user });
});
module.exports = router;


