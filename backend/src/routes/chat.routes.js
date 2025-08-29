const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const chatController = require("../controllers/chat.controller");
const router = express.Router();

// Get all chats
router.get("/", authMiddleware.authUser, chatController.getChats);

// Create new chat
router.post("/", authMiddleware.authUser, chatController.createChat);

router.get("/:id", authMiddleware.authUser, chatController.getChatForId);

// Update chat title
router.patch("/:id", authMiddleware.authUser, chatController.updateChat);

// Delete chat
router.delete("/:id", authMiddleware.authUser, chatController.deleteChat);

module.exports = router;
