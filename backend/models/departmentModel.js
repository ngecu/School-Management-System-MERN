import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Department name is required'],
        unique: true,
        trim: true,
        // e.g., "Computer Science", "Information Systems"
    },
    code: {
        type: String,
        required: [true, 'Department code is required'],
        unique: true,
        uppercase: true,
        trim: true,
        // e.g., "CS", "CIS", "DBIT", "DCIS", "BBSI"
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School', // Links to your existing schoolModel.js
        required: true
    },
    headOfDepartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecturer', // Links to your existing lecturerModel.js
        default: null
    },
    description: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Department = mongoose.model('Department', departmentSchema);

export default Department;