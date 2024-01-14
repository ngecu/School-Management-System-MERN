import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const lecturerSchema = mongoose.Schema(
  {
    nationalID: {
      type: String,
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
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
    }
  },
  {
    timestamps: true,
  }
);

lecturerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

lecturerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Lecturer = mongoose.model('Lecturer', lecturerSchema);

export default Lecturer;
