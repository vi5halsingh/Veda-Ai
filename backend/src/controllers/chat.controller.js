const userModel = require("../models/user.model");
const chatModel = require("../models/chat.model");

async function createChat(req, res) {
  const { title } = req.body;
  const user = req.user;

  const chat = await chatModel.create({
    title,
    user,
  });

  res.status(200).json(
    { msg: "chat created successfully",chat: {
        id: chat._id,
        title: chat.title,
        user: chat.user,
      }
     },
  );
}

module.exports = { createChat };
