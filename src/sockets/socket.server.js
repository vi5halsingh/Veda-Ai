const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const aiservice = require("../services/ai.service");
const messageModel = require("../models/message.model");
async function initSocketServer(httpServer) {
  const io = new Server(httpServer, {});
  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

    if (!cookies.token) {
      next(new Error("Unauthorize error : No token provided"));
    }
    try {
      const decode = await jwt.decode(cookies.token, process.env.JWT_SECRET);

      const user = await userModel.findById(decode.id);
      socket.user = user;

      next();
    } catch (error) {
      next(new Error("invalid token provided"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("ai-message", async (messagePayload) => {
      // console.log("your msg: ", messagePayload);
      await messageModel.create({
        user: socket.user._id,
        chat: messagePayload.chat,
        content: messagePayload.content,
        role: "user",
      });
      const chatHistory = (await messageModel.find({chat:messagePayload.chat}).sort({createdAt: -1}).limit(20).lean()).reverse()
      const response = await aiservice.generateResponse(chatHistory.map((item)=>{
       return {
          role:item.role,
          parts:[{text:item.content}]
        }
      }));

      await messageModel.create({
        user: socket.user._id,
        chat: messagePayload.chat,
        content: response,
        role: "model",
      });
      // console.log(chatHistory);
      socket.emit("ai-response", {
        content: response,
        chat: messagePayload.chat,
      });
    });
  });
}

module.exports = initSocketServer;
