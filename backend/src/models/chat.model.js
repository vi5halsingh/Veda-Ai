const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    lastactivity: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }    
);

const chatModel = mongoose.model("chats", chatSchema);
module.exports = chatModel;
