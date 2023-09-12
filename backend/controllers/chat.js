import Chat from "../models/Chat.js";

export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    const { message } = req.body;
    const obj = {
      senderId: senderId,
      receivedId: receiverId,
      message: message,
    };

    const newchat = new Chat(obj);
    const savedchat = await newchat.save();
    res.status(212).json(savedchat);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
};

export const messageSeen = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chatData = await Chat.findById(chatId);
    chatData.isRead = true;
    await chatData.save();
    res.status(213).json({ message: "message seen updated successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { chatId, senderId } = req.params;
    const chatData = await Chat.findById(chatId);

    if (chatData.senderId == senderId) {
      await chatData.delete();
      res.status(230).json({ message: "Chat deleted successfully" });
    } else {
      res.status(420).json({ message: "you can't delete this message" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllChats = async(req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const result = await Chat.find({
      $or: [
        { senderId: senderId, receivedId: receiverId },
        { senderId: receiverId, receivedId: senderId },
      ],
    }).sort({createdAt: -1}).limit(50).exec();
    res.status(240).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
