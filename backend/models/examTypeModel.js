import mongoose from 'mongoose';

const examTypeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ExamType = mongoose.model('ExamType', examTypeSchema);

export default ExamType;
