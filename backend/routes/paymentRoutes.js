// paymentTransactionRoutes.js

import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  createPaymentTransaction,
  getAllPaymentTransactions,
  getPaymentTransactionsBySchoolFeesId,
  getPaymentTransactionsByStudentId,
} from '../controllers/paymentTransactionControllers.js';

// Route to create payment transaction
router.route('/').post(protect, createPaymentTransaction);

// Route to get all payment transactions
router.route('/').get(protect, getAllPaymentTransactions);

// Route to get payment transactions by school fees ID
router.route('/school-fees/:id').get(protect, getPaymentTransactionsBySchoolFeesId);

// Route to get payment transactions by student ID
router.route('/student/:id').get(protect, getPaymentTransactionsByStudentId);

// Other payment transaction routes can be added here

export default router;
