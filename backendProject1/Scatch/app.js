const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const path = require("path");
const config = require("config");
const DB = require("./config/mongoose.connection");
// Models.....
const userModel = require("./models/user.model");
const productModel = require("./models/product.model");
const ownerModel = require("./models/owner.model");
// Router..
const usersRouter = require("./routes/usersRouter");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use("/users", usersRouter);
app.use("/owners", ownersRouter);
app.use("/products", productsRouter);

app.get("/", (req, res) => {
  res.send("Hey");
});

app.listen(config.get("PORT"), (err) => {
  console.log(`Running server on PORT: ${config.get("PORT")}`);
})
