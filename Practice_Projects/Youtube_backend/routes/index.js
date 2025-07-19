const express = require("express");
const apiRouter = express.Router();
const authRouter = require("./auth.router");
const videoRouter = require("./video.routes");


apiRouter.use('/auth', authRouter);
apiRouter.use('/videos', videoRouter);

module.exports = apiRouter;
