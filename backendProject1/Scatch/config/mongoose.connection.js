const mongoose = require("mongoose");
const DB = "mongodb://localhost:27017/scatch";
mongoose
  .connect(DB)
  .then(() => {
    console.log("MongoDB is connected !!");
  })
  .catch((err) => {
    console.log(err);
  })

module.exports = mongoose.connection;
