const mongoose = require("mongoose");
const DB = "mongodb+srv://adarshXpal:rinkiya69@nasaprojectclusture.gwuh1.mongodb.net/?retryWrites=true&w=majority&appName=NasaProjectClusture";

mongoose.connect(DB);
const userScheme = mongoose.Schema({
  name: String,
  email: String,
  image: String
});

module.exports = mongoose.model("user", userScheme);
