import mongoose from 'mongoose'

const classSchema = mongoose.Schema(
    {
  className: { type: String, required: true }
},
{
  timestamps: true,
}
);

const Class = mongoose.model('tblclass', classSchema);

module.exports = Class;
