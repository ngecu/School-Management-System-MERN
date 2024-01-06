import mongoose from 'mongoose';

const examSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    examType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ExamType',
      required: true,
    },
    courseUnit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseUnit',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Exam = mongoose.model('Exam', examSchema);

export default Exam;
