import mongoose from 'mongoose';

const examBookingSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam',
      required: true,
    },
    bookingReference: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['Booked', 'Confirmed', 'Cancelled', 'Completed'],
      default: 'Booked',
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    confirmedAt: {
      type: Date,
    },
    cancelledAt: {
      type: Date,
    },
    isEligible: {
      type: Boolean,
      default: true,
    },
    qrCode: {
      type: String,
    },
    examCardPrinted: {
      type: Boolean,
      default: false,
    },
    printedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure a student can only book an exam once
examBookingSchema.index({ student: 1, exam: 1 }, { unique: true });

const ExamBooking = mongoose.model('ExamBooking', examBookingSchema);

export default ExamBooking;