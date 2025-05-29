const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  fs.readdir("./files/", (err, files) => {
    console.log(files);
    res.render("index", { dirfiles: files });
  })
})
app.get("/file/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    res.render("show", { filename: req.params.filename, filedata: filedata });
  });
})
app.get("/edit/:filename", (req, res) => {
  res.render("edit", { filename: req.params.filename });
})
app.post("/edit/:filename", (req, res) => {
  fs.rename(`./files/${req.params.filename}`, `./files/${req.body.new.split(" ").join("")}.txt`, (err) => {
    res.redirect("/");
  });
})
app.post("/create", (req, res) => {
  fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.details, (err) => {
    res.redirect("/");
  });
})
app.listen(3001, () => {
  console.log("Server Running on Port=3001");
});
