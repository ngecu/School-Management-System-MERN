// timetableModel.js

import mongoose from 'mongoose';

const timetableSchema = mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    courseUnit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseUnit',
        required: true,    },
    lecturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lecturer',
      required: true,
    },
    year:{
        type: Number, 
        required: true,

    },
    dayOfWeek: {
      type: String, 
      required: true,
    },
    lecturerRoom: {
        type: String, 
        required: true,
      },
    startTime: {
      type: String, // Format: 'HH:mm' (24-hour format)
      required: true,
    },
    endTime: {
      type: String, // Format: 'HH:mm' (24-hour format)
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Timetable = mongoose.model('Timetable', timetableSchema);

export default Timetable;
