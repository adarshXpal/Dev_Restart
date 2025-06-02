const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://adarshXpal:rinkiya69@nasaprojectclusture.gwuh1.mongodb.net/?retryWrites=true&w=majority&appName=NasaProjectClusture");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  age: Number
});

module.exports = mongoose.model("user", userSchema);
