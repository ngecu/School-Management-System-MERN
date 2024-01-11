import express from 'express';

import { protect, admin } from '../middleware/authMiddleware.js';
import {
  createPaymentTransaction,
  getAllPaymentTransactions,
  getPaymentTransactionById,
  updatePaymentTransaction,
  deletePaymentTransaction,
  getPaymentTransactionByFee
} from '../controllers/paymentTransactionControllers.js';
const router = express.Router();
// Route to create payment transaction
router.route('/').post(protect, createPaymentTransaction);

// Route to get all payment transactions
router.route('/').get(protect, admin, getAllPaymentTransactions);

// Route to get a payment transaction by ID
router.route('/:id').get(protect,  getPaymentTransactionById);
router.route('/fee/:fee_id').get(protect,  getPaymentTransactionByFee);
// Route to update a payment transaction by ID
router.route('/:id').put(protect, admin, updatePaymentTransaction);

// Route to delete a payment transaction by ID
router.route('/:id').delete(protect, admin, deletePaymentTransaction);

// Other payment transaction routes can be added here

export default router;
