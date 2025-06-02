const express = require("express");
const app = express();
const PORT = 3000;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// Middleware necessary !!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes for get requests !!
app.get("/", (req, res) => {
  let token = jwt.sign({ phoneno: "+91-9882886002" }, "msdhoni");
  res.cookie("token", token);
  res.send("Token is set !!");
})

app.get("/read", (req, res) => {
  let data = jwt.verify(req.cookies.token, "msdhoni");
  res.send(data.phoneno);
})

// Routes for post requests !!

app.listen(PORT, (err) => {
  console.log(`Running server on PORT: ${PORT}`);
})
