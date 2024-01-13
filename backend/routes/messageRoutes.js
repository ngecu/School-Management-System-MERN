import express from 'express';
const router = express.Router();

import { protect } from '../middleware/authMiddleware.js';
import { createMessage, getMessagesByConversation } from '../controllers/messageControllers.js';

// Create a new message
router.route('/').post(createMessage);

// Get messages in a conversation
router.route('/:conversationId').get(protect, getMessagesByConversation);

export default router;
