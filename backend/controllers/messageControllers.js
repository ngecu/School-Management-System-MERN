import asyncHandler from 'express-async-handler';
import Message from '../models/messageModel.js';

// Create a new message

const createMessage = asyncHandler(async (req, res) => {
  try {
    const { from, message_text, conversation } = req.body;
    const message = await Message.create({ from, message_text, conversation });
    return res.status(201).json({ success: true, message });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
})

// Get messages in a conversation
const getMessagesByConversation = asyncHandler(async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversation: conversationId }).populate('from');
    return res.status(200).json({ success: true, messages });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
})

// Add more controllers as needed

export { createMessage, getMessagesByConversation };

