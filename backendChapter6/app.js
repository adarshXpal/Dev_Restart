const express = require("express");
const app = express();

const userModel = require("./models/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const path = require("path");
const PORT = 3000;

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.render("index", {});
})

app.post("/create", (req, res) => {
  let { username, email, password, age } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let createdUser = await userModel.create({ username, email, password: hash, age });
      let token = jwt.sign({ email }, "rinkiya");
      res.cookie("MyToken", token);
      res.send(createdUser);
    })
  })
})

app.get("/login", (req, res) => {
  res.render("login");
})

app.get("/logout", (req, res) => {
  res.cookie("MyToken", "");
  res.redirect("/");
})

app.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  console.log(user);
  if (!user) return res.send("Something went wrong !!");
  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: user.email }, "rinkiya");
      res.cookie("MyToken", token);
      res.send(user);
    } else {
      res.send("Something went wrong Babu!!");
    }
  })
})

app.listen(PORT, (err) => {
  console.log(`Running server on PORT: ${PORT}`);
})
