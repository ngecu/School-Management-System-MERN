import express from 'express';
const router = express.Router();

import { protect } from '../middleware/authMiddleware.js';
import { createConversation, getAllConversations } from '../controllers/conversationControllers.js';
import { getUserConversations } from '../controllers/conversationControllers.js';
// Importing the missing controllers

// Create a new conversation
router.route('/').post(protect, createConversation);

// Get all conversations
router.route('/').get(protect, getAllConversations);

// Get user conversations
router.route('/user-conversations').get(protect, getUserConversations);

export default router;
