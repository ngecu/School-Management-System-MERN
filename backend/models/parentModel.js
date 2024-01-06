import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const parentSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    }],
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


parentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

parentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})


const Parent = mongoose.model('Parent', parentSchema);

export default Parent;
