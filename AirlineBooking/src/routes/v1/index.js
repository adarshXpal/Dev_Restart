const express = require("express");
const v1Router = express.Router();
const { infoController } = require("../../controllers");

v1Router.get("/info", infoController);

module.exports = v1Router;
