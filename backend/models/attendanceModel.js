import mongoose from 'mongoose';

const attendanceSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },

    courseUnit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseUnit',
      required: true,    },
  
    signInTime: {
      type: Date,
      required: true,
      default: Date.now, 
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
