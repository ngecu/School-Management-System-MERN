import mongoose from 'mongoose';

const unitRegistrationSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program',
        required: true
    },
    academicYear: {
        type: String,
        required: true,
        // e.g., "2023/2024"
    },
    semester: {
        type: Number,
        enum: [1, 2, 3], // Supports trimesters or semesters
        required: true
    },
    registeredUnits: [{
        courseUnit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CourseUnit'
        },
        status: {
            type: String,
            enum: ['Active', 'Dropped'],
            default: 'Active'
        },
        registrationDate: {
            type: Date,
            default: Date.now
        }
    }],
    totalUnits: {
        type: Number,
        default: 0,
        validate: {
            validator: function(v) {
                // Enforce the "Reg 6 units per term" rule
                return v <= 6; 
            },
            message: 'A student cannot register for more than 6 units per term.'
        }
    },
    registrationStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    }
}, { timestamps: true });

// Ensure a student only has one registration record per semester/year
unitRegistrationSchema.index({ student: 1, academicYear: 1, semester: 1 }, { unique: true });

const UnitRegistration = mongoose.model('UnitRegistration', unitRegistrationSchema);

export default UnitRegistration;