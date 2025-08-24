const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const aiservice = require("../services/ai.service");
const messageModel = require("../models/message.model");
const { createMemory, queryMemory } = require("../services/vector.services");
async function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });
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

      // const message = await messageModel.create({
      //   user: socket.user._id,
      //   chat: messagePayload.chat,
      //   content: messagePayload.content,
      //   role: "user",
      // });

      // const vector = await aiservice.generateVector(messagePayload.content);
      const [message, vector] = await Promise.all([
        messageModel.create({
          user: socket.user._id,
          chat: messagePayload.chat,
          content: messagePayload.content,
          role: "user",
        }),
        aiservice.generateVector(messagePayload.content),
      ]);

      const chatmemory = await queryMemory({
        queryVector: vector,
        limit: 3,
        metadata: {},
      });

      const ltm = [
        {
          role: "user",
          parts: [
            {
              text: `these are some previous message from the chat, use them to generate a response ${chatmemory
                .map((item) => item.metadata.text)
                .join("/n")}`,
            },
          ],
        },
      ];

      await createMemory({
        vector,
        messageId: message._id,
        metadata: {
          chat: messagePayload.chat,
          user: socket.user._id,
          text: messagePayload.content,
        },
      });

      const chatHistory = (
        await messageModel
          .find({ chat: messagePayload.chat })
          .sort({ createdAt: -1 })
          .limit(20)
          .lean()
      ).reverse();
      const stm = chatHistory.map((item) => {
        return {
          role: item.role,
          parts: [{ text: item.content }],
        };
      });
      const response = await aiservice.generateResponse([...ltm, ...stm]);

      // const responseVector = await aiservice.generateVector(response);

      // const responseMessage = await messageModel.create({
      //   user: socket.user._id,
      //   chat: messagePayload.chat,
      //   content: response,
      //   role: "model",
      // });
      const [responseVector, responseMessage] = await Promise.all([
        aiservice.generateVector(response),

        messageModel.create({
          user: socket.user._id,
          chat: messagePayload.chat,
          content: response,
          role: "model",
        }),
      ]);
      await createMemory({
        vector: responseVector,
        messageId: responseMessage._id,
        metadata: {
          chat: messagePayload.chat,
          user: socket.user._id,
          text: response,
        },
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
