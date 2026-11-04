import mongoose from 'mongoose';

const academicRecordSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        unique: true // One master record per student
    },
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program',
        required: true
    },
    currentYearOfStudy: {
        type: Number,
        default: 1
    },
    currentSemester: {
        type: Number,
        default: 1
    },
    cumulativeGPA: {
        type: Number,
        default: 0.0
    },
    totalCreditsEarned: {
        type: Number,
        default: 0
    },
    academicStanding: {
        type: String,
        enum: ['Good Standing', 'Probation', 'Suspended', 'Graduated'],
        default: 'Good Standing'
    },
    // Array to hold the history for the "Rigor Per Student" report
    semesterHistory: [{
        academicYear: String,
        semester: Number,
        gpa: Number,
        creditsRegistered: Number,
        creditsEarned: Number,
        status: {
            type: String,
            enum: ['Pass', 'Fail', 'Incomplete'],
            default: 'Pass'
        }
    }],
    // Any incomplete/retake units
    retakeUnits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseUnit'
    }]
}, { timestamps: true });

const AcademicRecord = mongoose.model('AcademicRecord', academicRecordSchema);

export default AcademicRecord;