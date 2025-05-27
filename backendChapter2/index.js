const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.get("/:username", (req, res) => {
  // console.log(`Welcome ${req.params.username}`);
  res.render("daaku");
  // res.send(`Welcome ${req.params.username}`);
});
app.listen(PORT, () => {
  console.log(`Running Server on PORT: ${PORT}`);
});
app.listen()
