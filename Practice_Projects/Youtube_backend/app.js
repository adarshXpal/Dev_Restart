const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const DB = require("./config/mongoose.connection");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());

const apiRouter = require("./routes");
app.use("/api", apiRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  console.log(`Server running on http://localhost:${PORT}`);
})
