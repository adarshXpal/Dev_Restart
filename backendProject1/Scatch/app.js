const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const path = require("path");
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hey");
});

app.listen(PORT, (err) => {
  console.log(`Running server on PORT: ${PORT}`);
})



