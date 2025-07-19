const Video = require("../models/Video.model");

const videoController = async (req, res) => {
  try {
    const { title, description, isPublic } = req.body;
    const videoFile = req.files?.video?.[0];
    const thumbnailFile = req.files?.thumbnail?.[0];

    if (!videoFile || !thumbnailFile) {
      return res.status(400).json({
        message: "Video or thumbnail file is missing."
      });
    }

    const videoUrl = videoFile.path;
    const thumbnailUrl = thumbnailFile.path;
    const newVideo = await Video.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      isPublic: isPublic === "true",
      uploadedBy: req.user.userId
    });

    if (newVideo) {
      return res.status(201).json({
        message: "Video uploaded successfully",
        data: newVideo
      });
    } else {
      return res.status(500).json({
        message: "Failed to save video to database"
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong!"
    });
  }
};

module.exports = { videoController };
