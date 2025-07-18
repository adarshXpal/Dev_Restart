const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const authenticate = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      message: "token not valid"
    });
  }
  try {
    const decoded = jwt.verify(req.cookies.token, JWT_SECRET);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.status(400).json({
        message: "Token is not valid"
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }

};

module.exports = authenticate;
