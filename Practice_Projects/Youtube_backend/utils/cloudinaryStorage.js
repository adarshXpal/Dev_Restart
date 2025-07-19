const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "youtube/videos",
    resource_type: "video",
    format: async (req, file) => "mp4",
    public_id: (req, file) => Date.now() + "-video"
  }
});

const thumbnailStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "youtube/thumbnails",
    resource_type: "image",
    format: async (req, file) => "jpg",
    public_id: (req, file) => Date.now() + "-thumb"
  }
});

const uploadVideo = multer({ storage: videoStorage });
const uploadThumbnail = multer({ storage: thumbnailStorage });

module.exports = {
  uploadVideo,
  uploadThumbnail
};
