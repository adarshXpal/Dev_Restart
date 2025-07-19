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
  videoUrl: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User"
  },
  views: {
    type: Number,
    default: 0
  },
  likesCount: {
    type: Number,
    default: 0
  },
  dislikeCount: {
    type: Number,
    default: 0
  },
  isPublic: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Video", videoSchema);

