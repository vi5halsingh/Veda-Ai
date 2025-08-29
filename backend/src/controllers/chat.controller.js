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

const updateChat = async (req, res) => {
  try {
    if (!req.body.title) return res.status(400).json({ error: 'Title is required' });

    const chat = await chatModel.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true } // returns updated chat
    );

    if (!chat) return res.status(404).json({ error: 'Chat not found' });

    res.json({
      chat: {
        id: chat._id,
        title: chat.title,
        lastactivity: chat.lastactivity,
      },
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: error.message });
  }
};


const deleteChat = async (req, res) => {
  try {
    const chat = await chatModel.findByIdAndDelete(req.params.id);
   
    if (!chat) return res.status(404).json({ error: 'Chat not found' });
    
    // Delete associated messages
    await messageModel.deleteMany({ chat: req.params.id });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete chat' });
  }
};

module.exports = { createChat, getChats ,getChatForId, updateChat, deleteChat};
