import asyncHandler from 'express-async-handler';
import PaymentTransaction from '../models/paymentTransactionModel.js';
import SchoolFees from '../models/schoolFeesModel.js';

// @desc    Get all payment transactions
// @route   GET /api/paymentTransactions
// @access  Public
export const getAllPaymentTransactions = asyncHandler(async (req, res) => {
  const paymentTransactions = await PaymentTransaction.find()
    .populate({
      path: 'schoolFees',
      populate: {
        path: 'student',
        model: 'Student',
      },
    });

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

export const togglePaymentApproval = asyncHandler(async (req, res) => {
  const { school_fee_id } = req.body;

  const paymentTransaction = await PaymentTransaction.findById(req.params.id);

  if (!paymentTransaction) {
    res.status(404);
    throw new Error('Payment transaction not found');
  }

  const originalApprovalStatus = paymentTransaction.approved;
  paymentTransaction.approved = !originalApprovalStatus; // Toggle the approval status

  const updatedPaymentTransaction = await paymentTransaction.save();

  // Update the school fee amount based on the approval status
  const schoolFee = await SchoolFees.findById(school_fee_id);

  if (!schoolFee) {
    res.status(404);
    throw new Error('School fee not found');
  }

  if (originalApprovalStatus && !updatedPaymentTransaction.approved) {
    // If the payment was approved and now it's disapproved, subtract the amount
    schoolFee.amount += updatedPaymentTransaction.amount;
  } else if (!originalApprovalStatus && updatedPaymentTransaction.approved) {
    // If the payment was disapproved and now it's approved, add the amount
    schoolFee.amount -= updatedPaymentTransaction.amount;
  }

  // Save the updated school fee
  await schoolFee.save();

  res.status(200).json({ success: true, data: updatedPaymentTransaction });
});