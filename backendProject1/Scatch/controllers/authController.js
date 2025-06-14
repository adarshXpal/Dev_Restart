const express = require("express");
const userModel = require("../models/user.model");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { email, fullname, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
      req.flash("error", "Account already exist !!");
      return res.redirect("/");
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        {
          if (err) {
            return res.send(err.message);
          } else {
            let createdUser = await userModel.create({
              email,
              fullname,
              password: hash
            });
            let token = generateToken(createdUser);
            res.cookie("token", token);
            res.redirect("/shop");
          }
        }
      })
    })
  }
  catch (err) {
    console.log(err);
  }
}

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) {
    req.flash("error", "Email or password is incorrect !!");
    return res.redirect("/");
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      return res.redirect("/shop");
    }
    req.flash("error", "Email or password is incorrect !!");
    res.redirect("/");
  })
};

module.exports.logout = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
