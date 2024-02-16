import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const studentSchema = mongoose.Schema(
  {
    nationalID: {
      type: String,
      required: true,
    },
        yearOfStudy: {
      type: Number,
      default:1,
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    parents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Parent',
      required: true,
    }],
    status: {
      type: Boolean,
      default: false,
    },
    lastLoginDate: {
      type: Date,
    },
    lastLoginIp: {
      type: String,
    },
    photo: {
      type: String,
      default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7nmvPuHivliG0y_2glZDqMW3aZ4pbd8pzw&usqp=CAU"

    },
    password:{
      type: String,
      required:true
    },
    year_of_study:{
      type: String,
      required:true
    },
    mos:{
      type: String,
      required:true
    },
    admissionNumber:{
      type: String,
      required:true
    },

  },
  {
    timestamps: true,
  }
);



studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
