const express = require("express");
const authenticate = require("../middlewares/authenticate");
const controller = require("../controllers");
const { upload } = require("../utils/multer.config");

const videoRouter = express.Router();

videoRouter.post(
  "/upload",
  authenticate,
  upload,
  controller.videoController.uploadVideo
);

videoRouter.get("/", controller.videoController.getAllPublicVideos);
videoRouter.get("/:id", controller.videoController.getVideoById);
videoRouter.get("/user/:userId", controller.videoController.getVideosOfUser);
videoRouter.post("/:id/watch", authenticate, controller.videoController.watchVideo);
videoRouter.post("/:id/like", authenticate, controller.videoController.likeVideo);


module.exports = videoRouter;
