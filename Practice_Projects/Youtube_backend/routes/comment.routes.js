const express = require("express");
const commentRouter = express.Router();
const controller = require("../controllers");
const authenticate = require("../middlewares/authenticate");

commentRouter.post("/:videoId", authenticate, controller.commentController.uploadComment);
commentRouter.get("/:videoId", authenticate, controller.commentController.getCommentsForVideo);
commentRouter.post("/:commentId/like", authenticate, controller.commentController.likeComment);
commentRouter.delete("/:commentId/delete", authenticate, controller.commentController.deleteComment);

module.exports = commentRouter;
