const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");
const DB = `${config.get("MONGODB_URI")}/scatch`;
mongoose
  .connect(DB)
  .then(() => {
    dbgr("Connected with DataBase");
  })
  .catch((err) => {
    dbgr(err);
  })

module.exports = mongoose.connection;
