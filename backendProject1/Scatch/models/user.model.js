const mongoose = require("mongoose");
const DB = "mongodb://localhost:27017/scatch";
mongoose.connect(DB, (err) => {
  console.log("MongoDB is Connected.")
});

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  cart: [{
    type: Array,
    default: []
  }],
  isadmin: Boolean,
  orders: {
    type: Array,
    default: [],
  },
  contact: Number,
  picture: String
});

module.exports = mongoose.model("user", userSchema);
