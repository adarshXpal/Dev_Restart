const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const axios = require("axios");

dotenv.config();
const DB = require("./config/mongoose.connection");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const apiRouter = require("./routes");
app.use("/api", apiRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
