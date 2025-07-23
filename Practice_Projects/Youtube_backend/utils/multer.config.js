const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");

// Ensure folders exist
const videoFolder = path.join(__dirname, "..", "uploads", "videos");
const thumbnailFolder = path.join(__dirname, "..", "uploads", "thumbnails");
fs.ensureDirSync(videoFolder);
fs.ensureDirSync(thumbnailFolder);

// Dynamic disk storage based on field name
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    if (file.fieldname === "video") {
      cb(null, videoFolder);
    } else if (file.fieldname === "thumbnail") {
      cb(null, thumbnailFolder);
    } else {
      cb(new Error("Invalid fieldname"), false);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const prefix = file.fieldname === "video" ? "video" : "thumbnail";
    cb(null, `${prefix}-${Date.now()}${ext}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "video" && file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else if (file.fieldname === "thumbnail" && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

// Final uploader for both fields
const upload = multer({
  storage,
  fileFilter,
}).fields([
  { name: "video", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

module.exports = { upload };
