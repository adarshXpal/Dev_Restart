const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "video" && file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else if (file.fieldname === "thumbnail" && file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("unsupported file type"), false);
    }
  }
});

module.exports = upload;
