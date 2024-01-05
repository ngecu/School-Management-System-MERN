import mongoose from 'mongoose';

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    //   unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      required: true,
    },
    units:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseUnit',
        required: true,
    }]
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
