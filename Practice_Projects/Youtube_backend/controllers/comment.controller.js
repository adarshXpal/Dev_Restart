const { memoryStorage } = require("multer");
const Comment = require("../models/Comment.model");

const uploadComment = async (req, res) => {
  try {
    const { text, parentComment } = req.body;
    const userId = req.user.userId;
    const videoId = req.params.videoId;
    const comment = await Comment.create({
      text,
      video: videoId,
      user: userId,
      parentComment: parentComment
    })
    if (!comment) {
      return res.status(400).json({
        message: "Something went wrong !!"
      })
    }
    res.status(200).json({
      Message: "comment added Successfully ",
      comment
    })
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong !!",
      err
    })
  }
}
const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(400).json({
        message: "coudnt find the comment"
      })
    }
    const userId = req.user.userId;
    if (!userId) {
      return res.status(400).json({
        message: "Sign in First to like comment"
      })
    }

    if (!(comment.likes.includes(userId))) {
      comment.likes.push(userId);
      await comment.save();
      return res.status(200).json({
        message: "Like Added ++",
        LikedBy: comment.likes,
        Likes: comment.likes.length,
        comment
      })
    } else {
      const index = comment.likes.indexOf(userId);
      comment.likes.splice(index, 1);
      await comment.save();
      return res.status(200).json({
        message: "Like Removed from comment --",
        UnLikedBy: comment.likes,
        Likes: comment.likes.length,
        comment
      })
    }

  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      err
    });
  }
}

const getCommentsForVideo = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const videoComments = await Comment.find({ video: videoId });
    if (!videoComments) {
      return res.status(400).json({
        message: "No comments found"
      });
    }
    return res.status(200).json({
      message: "Comments for video retrieved Successfully !!",
      videoComments

    })
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      err
    });
  }

}

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(400).json({
        message: "Comment not found !!"
      });
    }
    res.status(202).json({
      message: "Comment Deleted Successfully !!",
      deletedComment
    })

  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      err
    });
  }
}


module.exports = { uploadComment, likeComment, getCommentsForVideo, deleteComment };
