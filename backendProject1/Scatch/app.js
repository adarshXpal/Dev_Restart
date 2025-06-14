const express = require("express");
const app = express();

const expressSession = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const path = require("path");
const config = require("config");
const DB = require("./config/mongoose.connection");
require("dotenv").config();
const isLoggedIn = require("./middlewares/isLoggedIn");
// Models.....
const userModel = require("./models/user.model");
const productModel = require("./models/product.model");
const ownerModel = require("./models/owner.model");
// Router..
const usersRouter = require("./routes/usersRouter");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.EXPRESS_SESSION_SECRET,
}));
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/owners", ownersRouter);
app.use("/products", productsRouter);


app.listen(config.get("PORT"), (err) => {
  console.log(`Running server on PORT: ${config.get("PORT")}`);
})
