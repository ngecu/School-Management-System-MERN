import mongoose from 'mongoose';

const paymentTransactionSchema = mongoose.Schema(
  {
    schoolFees: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SchoolFees',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    bank: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    transactionDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    transactionId: {
      type: String,
      required: true,
    },
    approved:{
      type:Boolean,
      required:true,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

const PaymentTransaction = mongoose.model('PaymentTransaction', paymentTransactionSchema);

export default PaymentTransaction;
