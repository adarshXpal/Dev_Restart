const Video = require("../models/Video.model");
const videoController = async (req, res) => {

  const { title, description, isPublic } = req.body;
  const videoUrl = req.files?.video[0]?.path || req.file?.path;
  const thumbnailUrl = req.files?.thumbnail[0]?.path || req.file?.path;
  if (!videoUrl || !thumbnailUrl) {
    res.status(403).json({
      message: "Somethings wrong with cloud"
    });
  }
  try {
    const newVideo = await Video.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      uploadedBy: req.user.userId
    })
    if (newVideo) {
      return res.status(201).json({
        message: "Video uploaded successfully"
      })
    } else {
      console.log("fadjfak:wrong");

    }
    return res.status(401).json({
      message: "New video not uploaded"
    })

  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong !!"
    })
  }
}

module.exports = { videoController };
