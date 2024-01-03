import mongoose from 'mongoose'

const tokenSchema = mongoose.Schema(
    {
        userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique:true
      },
      token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 3600 }
    },
    {
      timestamps: true,
    }
  )
  
  const Token = mongoose.model('Token', tokenSchema)
  
  export default Token