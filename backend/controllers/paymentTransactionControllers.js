import asyncHandler from 'express-async-handler';
import PaymentTransaction from '../models/paymentTransactionModel.js';

// @desc    Get all payment transactions
// @route   GET /api/paymentTransactions
// @access  Public
export const getAllPaymentTransactions = asyncHandler(async (req, res) => {
  const paymentTransactions = await PaymentTransaction.find().populate('schoolFees');
  res.status(200).json({ success: true, data: paymentTransactions });
});

// @desc    Get a single payment transaction by ID
// @route   GET /api/paymentTransactions/:id
// @access  Public
export const getPaymentTransactionById = asyncHandler(async (req, res) => {
  const paymentTransaction = await PaymentTransaction.findById(req.params.id).populate('schoolFees');

  if (paymentTransaction) {
    res.status(200).json({ success: true, data: paymentTransaction });
  } else {
    res.status(404);
    throw new Error('Payment transaction not found');
  }
});

export const getPaymentTransactionByFee = asyncHandler(async (req, res) => {
  const schoolFees = req.params.fee_id
  const paymentTransaction = await PaymentTransaction.find({schoolFees}).populate('schoolFees');

  if (paymentTransaction) {
    res.status(200).json({ success: true, data: paymentTransaction });
  } else {
    res.status(404);
    throw new Error('Payment transaction not found');
  }
});

// @desc    Create a new payment transaction
// @route   POST /api/paymentTransactions
// @access  Private (Admin)
export const createPaymentTransaction = asyncHandler(async (req, res) => {
  const {
    schoolFees,
    amount,
    paymentMethod,
    bank,
    phone,
    transactionDate,
    transactionId,
    approved,
  } = req.body;

  console.log(req.body);

  const paymentTransaction = await PaymentTransaction.create({
    schoolFees,
    amount,
    paymentMethod,
    bank,
    phone,
    transactionDate,
    transactionId,
    approved,
  });

  if (paymentTransaction) {
    res.status(201).json({
      success: true,
      data: paymentTransaction,
      message: 'Payment transaction created successfully',
    });
  } else {
    res.status(400);
    throw new Error('Invalid payment transaction data');
  }
});

// @desc    Update a payment transaction by ID
// @route   PUT /api/paymentTransactions/:id
// @access  Private (Admin)
export const updatePaymentTransaction = asyncHandler(async (req, res) => {
  const {
    schoolFees,
    amount,
    paymentMethod,
    bank,
    phone,
    transactionDate,
    transactionId,
    approved,
  } = req.body;

  const paymentTransaction = await PaymentTransaction.findById(req.params.id);

  if (paymentTransaction) {
    paymentTransaction.schoolFees = schoolFees || paymentTransaction.schoolFees;
    paymentTransaction.amount = amount || paymentTransaction.amount;
    paymentTransaction.paymentMethod = paymentMethod || paymentTransaction.paymentMethod;
    paymentTransaction.bank = bank || paymentTransaction.bank;
    paymentTransaction.phone = phone || paymentTransaction.phone;
    paymentTransaction.transactionDate = transactionDate || paymentTransaction.transactionDate;
    paymentTransaction.transactionId = transactionId || paymentTransaction.transactionId;
    paymentTransaction.approved = approved || paymentTransaction.approved;

    const updatedPaymentTransaction = await paymentTransaction.save();
    res.status(200).json({ success: true, data: updatedPaymentTransaction });
  } else {
    res.status(404);
    throw new Error('Payment transaction not found');
  }
});

// @desc    Delete a payment transaction by ID
// @route   DELETE /api/paymentTransactions/:id
// @access  Private (Admin)
export const deletePaymentTransaction = asyncHandler(async (req, res) => {
  const paymentTransaction = await PaymentTransaction.findById(req.params.id);

  if (paymentTransaction) {
    await paymentTransaction.remove();
    res.json({ success: true, message: 'Payment transaction removed' });
  } else {
    res.status(404);
    throw new Error('Payment transaction not found');
  }
});
