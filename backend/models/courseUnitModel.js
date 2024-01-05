import mongoose from 'mongoose';

const courseUnitSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique:true
    },
    code: {
      type: String,
      required: true,
      unique: true,
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

const CourseUnit = mongoose.model('CourseUnit', courseUnitSchema);

export default CourseUnit;
