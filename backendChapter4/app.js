let express = require("express");
let app = express();
let path = require("path");
let userModel = require("./models/user");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("index");
})
app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.render("read", { users });
})
app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;
  let createduser = await userModel.create({
    name,
    email,
    image
  });
  res.redirect("/read");
})
app.get("/delete/:id", async (req, res) => {
  let deleteduser = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
})
app.get("/edit/:id", async (req, res) => {
  let usertoedit = await userModel.findOne({ _id: req.params.id });
  res.render("edit", { usertoedit })
})
app.post("/edit/:id", async (req, res) => {
  let { name, email, image } = req.body;
  let updateduser = await userModel.findOneAndUpdate({ _id: req.params.id }, { name, email, image }, { new: true })
  res.redirect("/read");
})
app.listen(3000, () => {
  console.log("Running server on Port 3000 !!");
});
