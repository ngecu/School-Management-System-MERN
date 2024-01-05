import mongoose from 'mongoose';

const schoolSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    //   unique: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const School = mongoose.model('School', schoolSchema);

export default School;
