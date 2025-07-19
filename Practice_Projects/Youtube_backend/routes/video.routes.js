const express = require("express");
const authenticate = require("../middlewares/authenticate");
const controller = require("../controllers");
const upload = require("../utils/cloudinaryStorage");

const videoRouter = express.Router();

videoRouter.post(
  "/upload",
  authenticate,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),
  controller.videoController.videoController
);

module.exports = videoRouter;
