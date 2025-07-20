const User = require("../models/User.model");

const subscribe = async (req, res) => {
  try {
    const channelId = req.params.userId;
    const { userId } = req.user;
    const channel = await User.findById(channelId);
    const user = await User.findById(userId);
    if (!channel || !user || channelId === userId) {
      return res.status(400).json({
        message: "channel or User not found"
      })
    }
    if (user.subscribedTo.includes(channelId)) {
      user.subscribedTo = user.subscribedTo.filter(id => id != channelId);
      channel.subscribers = channel.subscribers.filter(id => id != userId);
      await user.save();
      await channel.save();
      return res.status(206).json({
        Message: `Unsubscribed to ${channelId}`
      });
    } else {
      channel.subscribers.push(userId);
      user.subscribedTo.push(channelId);
      await channel.save();
      await user.save();
      return res.status(201).json({
        Message: `subscribed to ${channelId}`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went galat",
      err
    })
  }
}

module.exports = { subscribe };
