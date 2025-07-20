const express = require("express");
const authenticate = require("../middlewares/authenticate");
const subscribeRouter = express.Router();
const controller = require("../controllers");

subscribeRouter.post("/:userId", authenticate, controller.subscribeController.subscribe);

module.exports = subscribeRouter;
