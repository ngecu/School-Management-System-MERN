import express from 'express';

import { protect, admin, safaricomAccessToken } from '../middleware/authMiddleware.js';
import {
  createPaymentTransaction,
  getAllPaymentTransactions,
  getPaymentTransactionById,
  updatePaymentTransaction,
  deletePaymentTransaction,
  getPaymentTransactionByFee,
  togglePaymentApproval
} from '../controllers/paymentTransactionControllers.js';
import { initiateSTKPush } from '../controllers/mpesaControllers.js';
const router = express.Router();
// Route to create payment transaction
router.route('/').post(protect,safaricomAccessToken, initiateSTKPush);

// Route to get all payment transactions
router.route('/').get(protect, getAllPaymentTransactions);

// Route to get a payment transaction by ID
router.route('/:id').get(protect,  getPaymentTransactionById);
router.route('/fee/:fee_id').get(protect,  getPaymentTransactionByFee);
// Route to update a payment transaction by ID
router.route('/:id').put(protect, admin, updatePaymentTransaction);
router.route('/:id/toggle-approval').put(protect,togglePaymentApproval);

// Route to delete a payment transaction by ID
router.route('/:id').delete(protect, admin, deletePaymentTransaction);

// Other payment transaction routes can be added here

export default router;
