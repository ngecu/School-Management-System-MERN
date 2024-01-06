import asyncHandler from 'express-async-handler';
import PaymentTransaction from '../models/paymentTransactionModel.js';

// @desc    Create payment transaction
// @route   POST /api/payment-transactions
// @access  Private
export const createPaymentTransaction = asyncHandler(async (req, res) => {
  const { schoolFeesId, amount, paymentMethod, transactionDate, transactionId } = req.body;

  const paymentTransaction = await PaymentTransaction.create({
    schoolFees: schoolFeesId,
    amount,
    paymentMethod,
    transactionDate,
    transactionId,
  });

  res.status(201).json(paymentTransaction);
});

// @desc    Get all payment transactions
// @route   GET /api/payment-transactions
// @access  Private
export const getAllPaymentTransactions = asyncHandler(async (req, res) => {
  const paymentTransactions = await PaymentTransaction.find().populate('schoolFees');

  res.json(paymentTransactions);
});

// @desc    Get payment transactions by school fees ID
// @route   GET /api/payment-transactions/:id
// @access  Private
export const getPaymentTransactionsBySchoolFeesId = asyncHandler(async (req, res) => {
  const schoolFeesId = req.params.id;
  const paymentTransactions = await PaymentTransaction.find({ schoolFees: schoolFeesId });

  res.json(paymentTransactions);
});

export const getPaymentTransactionsByStudentId = asyncHandler(async (req, res) => {
    const studentId = req.params.id;
    
    // Assuming PaymentTransaction model has a reference to the Student model
    const paymentTransactions = await PaymentTransaction.find().populate({
      path: 'schoolFees',
      populate: {
        path: 'student',
        match: { _id: studentId },
      },
    });
  
    // Extract payment transactions that are related to the specified student
    const filteredTransactions = paymentTransactions.filter(transaction => {
      return transaction.schoolFees && transaction.schoolFees.student;
    });
  
    res.json(filteredTransactions);
  });