import asyncHandler from 'express-async-handler';

import Conversation from '../models/conversationModel.js';

// Create a new conversation
const createConversation = asyncHandler(async (req, res) => {
  try {
    const { name, group_members } = req.body;
    const conversation = await Conversation.create({ name, group_members });
    return res.status(201).json({ success: true, conversation });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
})

// Get all conversations
const getAllConversations = asyncHandler(async (req, res) => {
  try {
    const conversations = await Conversation.find().populate('group_members.user');
    return res.status(200).json({ success: true, conversations });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
})

const getUserConversations = asyncHandler(async (req, res) => {
  console.log(req.user);
  const userId = req.user._id; // Assuming user ID is available in the request after authentication

  // Find conversations where the user is a member
  const conversations = await Conversation.find({ 'group_members.user': userId })
    .populate('group_members.user', 'firstName lastName email'); // Add the fields you want to populate

  res.json(conversations);
});


// Add more controllers as needed

export { createConversation, getAllConversations,getUserConversations };
