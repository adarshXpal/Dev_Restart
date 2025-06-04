const express = require("express");
const app = express();
const PORT = 3000;

const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("./models/user.model");
const postModel = require("./models/post.model");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
})
app.get("/login", (req, res) => {
  res.render("login");
})
app.get("/logout", (req, res) => {
  res.cookie("MYtoken", "");
  res.redirect("/login");
})
app.get("/profile", isLoggedIn, (req, res) => {
  console.log(`${req.user.email} ${req.user.userid}`);
  res.send("You have opened a profile page");
})

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) {
    res.status(400).send("Something went wrong !!");
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: email, userid: user._id }, "shah");
      res.cookie("Mytoken", token);
      res.send("You have been Logged In!!");
    } else {
      res.status(400).send("Something went wrong !!");
    }
  })
})

app.post("/register", async (req, res) => {
  let { name, username, email, password, age } = req.body;
  let user = await userModel.findOne({ email });
  if (user) {
    res.status(500).send("Hey user exist !! Login.");
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        let createdUser = await userModel.create({
          name,
          email,
          username,
          age,
          password: hash
        });
        let token = jwt.sign({ email: email, userid: createdUser._id }, "shah");
        res.cookie("Mytoken", token);
        res.send("registered !!");
      })
    })
  }
})



function isLoggedIn(req, res, next) {
  let token = req.cookies.Mytoken;
  if (!token) return res.status(401).send("User must login!");
  jwt.verify(token, "shah", (err, result) => {
    if (err) {
      return res.status(401).send("Invalid or expired token!");
    }
    req.user = result;
    next();
  });
}


app.listen(PORT, () => {
  console.log(`Running server on PORT: ${PORT}`);
})

