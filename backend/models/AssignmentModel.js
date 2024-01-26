import mongoose from 'mongoose';

const assignmentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Reference to the Course model
  },
  yearOfStudy:{
    type: Number,
    required: true,

  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lecturer', // Reference to the User model who created the assignment
  },
}, { timestamps: true });

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
