const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  hlsUrl: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String
  },
  uploadedBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User"
  },
  views: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  isPublic: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Video", videoSchema);

