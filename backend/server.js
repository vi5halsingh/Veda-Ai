require("dotenv").config();
const app = require("./src/app");
const initSocketServer = require("./src/sockets/socket.server");
const httpServer = require("http").createServer(app);

initSocketServer(httpServer);
httpServer.listen(3000, () => {
  console.log("server is running");
});
