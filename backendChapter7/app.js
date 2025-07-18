const express = require("express");
const app = express();
const PORT = 3000;

const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const crypto = require("crypto");

const userModel = require("./models/user.model");
const postModel = require("./models/post.model");
const upload = require("./config/multerconfig");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.render("index");
})
app.get("/login", (req, res) => {
  res.render("login");
})
app.get("/logout", (req, res) => {
  res.cookie("MYtoken", "");
  res.redirect("/login");
});
app.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email }).populate("posts");
  res.render("profile", { user });
})
app.get("/like/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  if (post.likes.indexOf(req.user.userid) === -1) {
    post.likes.push(req.user.userid);
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1);
  }
  await post.save();
  res.redirect("/profile");
})

app.get("/edit/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id });
  res.render("edit", { post });
});

app.get("/profile/upload", (req, res) => {
  res.render("profileupload");
});

app.post("/upload", isLoggedIn, upload.single("image"), async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.profilepic = req.file.filename;
  await user.save();
  res.redirect("/profile");
})
app.post("/edit/:id", isLoggedIn, async (req, res) => {
  let updatedPost = await postModel.findOneAndUpdate({ _id: req.params.id }, { content: req.body.content });
  res.redirect("/profile");
})
app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) {
    res.status(400).send("Something went wrong !!");
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: email, userid: user._id }, "shah", { expiresIn: "1h" });
      res.cookie("Mytoken", token);
      res.redirect("/profile");
    } else {
      res.status(400).send("Something went wrong !!");
    }
  })
})

app.post("/register", async (req, res) => {
  let { name, username, email, password, age } = req.body;
  let user = await userModel.findOne({ email });
  if (user) {
    res.redirect("/login");
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
        let token = jwt.sign({ email: email, userid: createdUser._id }, "shah", { expiresIn: "1h" });
        res.cookie("Mytoken", token);
        res.redirect("/profile");
      })
    })
  }
})

app.post("/post", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  let { content } = req.body;
  let post = await postModel.create({
    user: user._id,
    content: content,
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});


function isLoggedIn(req, res, next) {
  let token = req.cookies.Mytoken;
  if (!token) {
    res.redirect("/login");
  }
  jwt.verify(token, "shah", (err, decoded) => {
    if (err) res.status(400).send("Invalid token !!");
    req.user = decoded;
    next();
  })
}


app.listen(PORT, () => {
  console.log(`Running server on PORT: ${PORT}`);
})

