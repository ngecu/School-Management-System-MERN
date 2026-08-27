import mongoose from 'mongoose';

const examResultSchema = mongoose.Schema(
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
    marksObtained: {
      type: Number,
      required: true,
      default: 0,
    },
    registered: {
      type: Boolean,
      default: true,
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    grade: {
      type: String,
      enum: ['A', 'B', 'C', 'D', 'F', 'PENDING'],
      default: 'PENDING',
    },
    remarks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure a student can register for an exam only once
examResultSchema.index({ student: 1, exam: 1 }, { unique: true });

const ExamResult = mongoose.model('ExamResult', examResultSchema);

export default ExamResult;