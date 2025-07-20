const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
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
  likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  parentComment: {
    type: mongoose.Types.ObjectId,
    ref: "Comment",
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Comment", commentSchema);
