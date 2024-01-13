import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    joined_date_time: {
      type: Date,
      required: true,
      default: Date.now,
    },
    left_date_time: {
      type: Date,
    },
  },
  { _id: false } // To disable auto-generation of _id for members
);

const conversationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    group_members: [memberSchema],
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;
