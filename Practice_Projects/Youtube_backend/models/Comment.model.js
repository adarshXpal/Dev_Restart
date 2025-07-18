const mongoose = require("mongoose");
const { applyTimestamps } = require("./Video.model");

const commentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  video: {
    type: mongoose.Types.ObjectId,
    ref: "Video",
    required: true
  },
  likeCount: {
    type: Number,
    default: 0
  },
  parentComment: {
    type: mongoose.Types.ObjectId,
    ref: "Comment"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Comment", commentSchema);
