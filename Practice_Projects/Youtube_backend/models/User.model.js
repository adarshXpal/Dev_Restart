const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    minLength: 6,
    required: true
  },
  uploadedVideos: [{
    type: mongoose.Types.ObjectId,
    ref: "Video"
  }],
  likedVideos: [{
    type: mongoose.Types.ObjectId,
    ref: "Video"
  }],
  playlist: [{
    name: String,
    videos: [{ type: mongoose.Types.ObjectId, ref: "Video" }]
  }],
  subscribedTo: [{
    type: mongoose.Types.ObjectId,
    ref: "User"
  }],
  subscribers: [{
    type: mongoose.Types.ObjectId,
    ref: "User"
  }]
})

module.exports = mongoose.model("User", userSchema);
