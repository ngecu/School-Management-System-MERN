import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Program name is required'],
        trim: true,
        // e.g., "Bachelor of Business Information Technology"
    },
    code: {
        type: String,
        required: [true, 'Program code is required'],
        unique: true,
        uppercase: true,
        // e.g., "BBIT", "BSc CS"
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    level: {
        type: String,
        enum: ['Certificate', 'Diploma', 'Degree', 'Masters', 'PhD'],
        required: true
    },
    modeOfStudy: {
        type: String,
        enum: ['Mode 1 (Full-time)', 'Mode 2 (Part-time)', 'Distance Learning'],
        default: 'Mode 1 (Full-time)' // Note mentions "Mode 1 - a Semester"
    },
    durationInSemesters: {
        type: Number,
        required: true
    },
    // CRITICAL FEATURE FROM NOTES: "on registration put a cap"
    maxCapacity: {
        type: Number,
        required: [true, 'Maximum capacity is required'],
        default: 100 // The cap limit
    },
    currentEnrollment: {
        type: Number,
        default: 0 // Tracks how many students are currently in this program
    },
    // "Reg 6 units per term"
    maxUnitsPerSemester: {
        type: Number,
        default: 6,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Program = mongoose.model('Program', programSchema);

export default Program;