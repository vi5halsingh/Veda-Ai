const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chats",

    },
    content: {
      type: String,
      required: true,
    },
    role:{
        type:String,
        enum:{["user"]}
    }
  },
  { timestamps: true }
);

const chatModel = mongoose.model("chats", chatSchema);
module.exports = chatModel;
