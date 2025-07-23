const Video = require("../models/Video.model");
const User = require("../models/User.model");
const transcodeToHLS = require("../utils/transcodeToHLS");
const path = require("path");
const fs = require("fs-extra");
const PORT = process.env.PORT || 5000;

const uploadVideo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.userId;

    const videoFile = req.files["video"]?.[0];
    const thumbnailFile = req.files["thumbnail"]?.[0];

    if (!videoFile) {
      return res.status(400).json({ message: "Video file is required" });
    }

    const videoId = path.parse(videoFile.filename).name;

    const hdfsPath = await transcodeToHLS(videoFile.path, videoId);

    const hlsUrl = `http://localhost:${PORT}/api/stream/${videoId}/index.m3u8`;

    const thumbnailUrl = thumbnailFile
      ? `/uploads/thumbnails/${thumbnailFile.filename}`
      : "";

    const newVideo = await Video.create({
      title,
      description,
      hlsUrl,
      thumbnailUrl,
      uploadedBy: userId,
    });

    return res.status(201).json({
      message: "Video uploaded and processed successfully",
      video: newVideo,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    return res.status(500).json({ message: "Failed to upload video" });
  }
};

const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("uploadedBy", "name username");
    if (!video) {
      res.status(400).json({
        message: "Could not get the video"
      });
    }
    return res.status(200).json({
      message: "Video recived !!",
      video
    })
  } catch (error) {
    res.status(400).json({
      message: "Could not get the video",
      error
    });
  }
}

const getAllPublicVideos = async (req, res) => {
  try {
    const video = await Video.find({ isPublic: true }).sort({ createdAt: -1 }).populate("uploadedBy", "username name");
    if (!video) {
      return res.status(400).json({
        message: "Could not get homepage feed"
      });
    }
    return res.status(200).json({
      message: "homepage feed recived",
      video
    })
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
      error
    });
  }
}

const getVideosOfUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const videos = await Video.find({ uploadedBy: userId });
    if (!videos) {
      return res.status(400).json({
        message: "could not find any videos"
      });
    }
    return res.status(200).json({
      message: "User Video retrieved successfully !!",
      videos
    });
  } catch (err) {
    res.status(400).json({
      message: "could not find any videos"
    });
  }
}

const watchVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(400).json({
        message: "Couldnt find the video"
      })
    }
    const userId = req.user.userId;
    if (!userId) {
      return res.status(400).json({
        message: "Sign in First to watch"
      })
    }
    if (!(video.views.includes(userId))) {
      video.views.push(userId);
      await video.save();
      return res.status(200).json({
        message: "Video view count ++",
        ViewedBy: video.views,
        Views: video.views.length
      })
    }
    res.status(400).json({
      message: "Already watched",
      ViewedBy: userId,
      Views: video.views.length
    })
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      err
    });
  }
}
const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(400).json({
        message: "coudnt find the video"
      })
    }
    const userId = req.user.userId;
    if (!userId) {
      return res.status(400).json({
        message: "Sign in First to like"
      })
    }

    if (!(video.likes.includes(userId))) {
      video.likes.push(userId);
      await video.save();
      return res.status(200).json({
        message: "Like Added ++",
        LikedBy: video.likes,
        Likes: video.likes.length
      })
    } else {
      const index = video.likes.indexOf(userId);
      video.likes.splice(index, 1);
      await video.save();
      return res.status(200).json({
        message: "Like Removed ++",
        UnLikedBy: video.likes,
        Likes: video.likes.length
      })
    }

  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      err
    });
  }
}

module.exports = { uploadVideo, getVideoById, getAllPublicVideos, getVideosOfUser, watchVideo, likeVideo };
