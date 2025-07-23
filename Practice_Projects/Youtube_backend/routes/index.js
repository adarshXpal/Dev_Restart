const express = require("express");
const apiRouter = express.Router();
const authRouter = require("./auth.router");
const videoRouter = require("./video.routes");
const commentRouter = require("./comment.routes");
const subscribeRouter = require("./subscribe.routes");
const streamRouter = require("./stream.routes");


apiRouter.use('/auth', authRouter);
apiRouter.use('/videos', videoRouter);
apiRouter.use('/comment', commentRouter);
apiRouter.use('/subscribe', subscribeRouter);
apiRouter.use('/stream', streamRouter);

module.exports = apiRouter;
