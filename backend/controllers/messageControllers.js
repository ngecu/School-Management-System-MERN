import asyncHandler from 'express-async-handler';
import Message from '../models/messageModel.js';
import Conversation from '../models/conversationModel.js';

// Create a new message
const createMessage = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const { content, user_id, to } = req.body;
    const from = user_id;

    let message;
    let existingConversation;

    // Check if the conversation exists
    existingConversation = await Conversation.findOne({
      'group_members.user': { $all: [from, to] },
    });

    if (!existingConversation) {
      
      // If the conversation doesn't exist, create a new one
      existingConversation = await Conversation.create({
        name: `Group Chat ${new Date().getTime()}`,
        group_members: [{ user: from }, { user: to }],
      });
    }
    console.log("conversation does ext ",existingConversation);

    // Create the message
    message = await Message.create({
      from,
      message_text: content,
      conversation: existingConversation._id,
    });

    return res.status(201).json({ success: true, message });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Get messages in a conversation
const getMessagesByConversation = asyncHandler(async (req, res) => {
  try {
    console.log(req.params);
    const { conversationId } = req.params;
    const messages = await Message.find({ conversation: conversationId }).populate('from');
    return res.status(200).json({ success: true, messages });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
})

// Add more controllers as needed

export { createMessage, getMessagesByConversation };

