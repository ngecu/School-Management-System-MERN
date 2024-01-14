import mongoose from 'mongoose';

// Define the schema for the transaction details
const mpesaSchema =  mongoose.Schema({
  Order_ID: {
    type: String,
    required: true,
  },
  MerchantRequestID: {
    type: String,
    required: true,
  },
  CheckoutRequestID: {
    type: String,
    required: true,
  },
  ResultCode: {
    type: String,
    required: true,
  },
  ResultDesc: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
  },
  Amount: {
    type: String,
    required: true,
  },
  MpesaReceiptNumber: {
    type: String,
    required: true,
  },
  TransactionDate: {
    type: String,
    required: true,
  },
});

// Create the Mongoose model based on the schema
const Mpesa = mongoose.model('Mpesa', mpesaSchema);

export default Mpesa;
