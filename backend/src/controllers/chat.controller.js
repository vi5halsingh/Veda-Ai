const userModel = require("../models/user.model");
const chatModel = require("../models/chat.model");
const messageModel = require("../models/message.model");

async function createChat(req, res) {
  const { title } = req.body;
  const user = req.user;

  const chat = await chatModel.create({
    title,
    user,
  });

  res.status(200).json({
    msg: "chat created successfully",
    chat: {
      id: chat._id,
      title: chat.title,
      user: chat.user,
      lastactivity: chat.lastactivity,
    },
  });
}

async function getChats(req, res) {
  try {
    const chats = await chatModel
      .find({ user: req.user._id })
      .sort({ lastactivity: -1 })
      .lean();

    res.status(200).json({
      chats: chats.map((chat) => ({
        id: chat._id,
        title: chat.title,
        lastactivity: chat.lastactivity,
      })),
    });
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ msg: "Error fetching chats" });
  }
}

async function getChatForId(req, res) {
  const messages = await messageModel.find({chat:req.params.id}).lean()
  res.status(200).json({
    messages
  })
}

module.exports = { createChat, getChats ,getChatForId};
