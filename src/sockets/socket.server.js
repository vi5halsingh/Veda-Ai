const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const aiservice = require('../services/ai.service')
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
    socket.on('ai-massege',async (messagePayload)=>{
        const response = await aiservice.generateResponse(messagePayload.content)

        socket.emit('ai-response',{
          content:response,
          chat:messagePayload.chat
        })
    })
  });
}

module.exports = initSocketServer;
