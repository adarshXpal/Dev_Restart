const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const cookieParser = require("cookie-parser");

module.exports = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "You need to login !!");
    return res.redirect("/");
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");
    req.user = user;
    if (user) {
      next();
    } else {
      req.flash("error", "something went wrong !!");
      res.redirect("/");
    }
  }
  catch (err) {
    req.flash("error", "something went wrong !!");
    res.redirect("/");
  }
};
