import express from "express";
import {
  sendMessage,
  messageSeen,
  deleteMessage,
  getAllChats
} from "../controllers/chat.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// add chat
router.post("/:senderId/:receiverId/add", verifyToken, sendMessage);
router.patch("/:chatId/seen", verifyToken, messageSeen);

// delete chat
router.delete("/:chatId/:senderId/delete", verifyToken, deleteMessage);

// get all chat 
router.get("/:senderId/:receiverId/chats",verifyToken,getAllChats)

export default router;
