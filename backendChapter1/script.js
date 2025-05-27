const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Checking the express package !!");
})
app.get("/Home", (req, res, next) => {
  res.send("You are in Home Page !!");
})
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(403).send("Teri Maa ka ai ai yoo");
})
app.listen(3000, () => {
  console.log("Running on Port 3000");
});

