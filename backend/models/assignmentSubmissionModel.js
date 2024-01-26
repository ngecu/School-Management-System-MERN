import mongoose from 'mongoose';

const submissionSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Reference to the Student model
    required: true,
  },
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment', // Reference to the Assignment model
    required: true,
  },
  submittedDate: {
    type: Date,
    default: Date.now,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  // You can add more fields based on your requirements
}, { timestamps: true });

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;
