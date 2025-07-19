const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    if (file.fieldname === "video") {
      return {
        folder: "youtube/videos",
        resource_type: "video",
        format: "mp4",
        public_id: `video-${Date.now()}`,
      };
    } else if (file.fieldname === "thumbnail") {
      return {
        folder: "youtube/thumbnails",
        resource_type: "image",
        format: "jpg",
        public_id: `thumbnail-${Date.now()}`,
      };
    }
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
