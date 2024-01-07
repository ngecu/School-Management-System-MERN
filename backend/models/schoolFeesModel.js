import mongoose from 'mongoose';

const schoolFeesSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Paid', 'Pending'],
      default: 'Pending',
    },
    dueDate: {
      type: Date,
    },
    transactionId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const SchoolFees = mongoose.model('SchoolFees', schoolFeesSchema);

export default SchoolFees;
