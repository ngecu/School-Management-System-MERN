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
    },
  },
  {
    timestamps: true,
  }
);

const ExamResult = mongoose.model('ExamResult', examResultSchema);

export default ExamResult;
