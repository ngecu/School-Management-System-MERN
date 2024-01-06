import mongoose from 'mongoose';

const messageSchema = mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,

    },
    message_text: {
      type: String,
      trim: true,
      required: true,

    },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,

    },
    sent_datetime:{
      type:Date,
      default:Date.now()
    }
  },
  {
    timeStamp: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
