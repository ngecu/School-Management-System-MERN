import AcademicRecord from '../models/academicRecordModel.js';
import ExamResult from '../models/examResultModel.js';
import CourseUnit from '../models/courseUnitModel.js';

// Helper function to calculate Grade and Points
const calculateGrade = (marks) => {
    if (marks >= 70) return { grade: 'A', points: 4.0 };
    if (marks >= 60) return { grade: 'B', points: 3.0 };
    if (marks >= 50) return { grade: 'C', points: 2.0 };
    if (marks >= 40) return { grade: 'D', points: 1.0 };
    return { grade: 'E', points: 0.0 };
};

// @desc    Process results after marks entry (Update GPA, Credits)
// @route   POST /api/academics/process-results
export const processStudentResults = async (req, res) => {
    try {
        const { studentId, academicYear, semester } = req.body;

        // 1. Fetch all marks entered for this student this semester
        const results = await ExamResult.find({ student: studentId, academicYear, semester })
            .populate('courseUnit');

        if (results.length === 0) {
            return res.status(404).json({ message: 'No marks found to process.' });
        }

        let totalPoints = 0;
        let totalCredits = 0;
        let unitsFailed = [];

        // 2. Loop through results and calculate GPA
        for (let result of results) {
            const { grade, points } = calculateGrade(result.marks);
            
            // Update individual ExamResult
            result.grade = grade;
            result.gradePoints = points;
            result.status = 'Processed';
            await result.save();

            // Calculate for GPA (Assuming courseUnit has 'credits' field)
            const credits = result.courseUnit.credits || 3; 
            totalPoints += (points * credits);
            totalCredits += credits;

            if (points === 0) unitsFailed.push(result.courseUnit._id);
        }

        const semesterGPA = totalCredits > 0 ? (totalPoints / totalCredits) : 0;

        // 3. Update the Academic Record ("Rigor Per Student")
        let academicRecord = await AcademicRecord.findOne({ student: studentId });

        if (!academicRecord) {
            academicRecord = new AcademicRecord({ student: studentId, program: results[0].program });
        }

        // Add to history
        academicRecord.semesterHistory.push({
            academicYear,
            semester,
            gpa: semesterGPA,
            creditsRegistered: totalCredits,
            creditsEarned: totalCredits - (unitsFailed.length * 3), // Simple logic for earned credits
            status: unitsFailed.length > 0 ? 'Fail' : 'Pass'
        });

        // Update Cumulative GPA
        const allHistories = academicRecord.semesterHistory;
        const totalCumulativePoints = allHistories.reduce((acc, curr) => acc + (curr.gpa * curr.creditsRegistered), 0);
        const totalCumulativeCredits = allHistories.reduce((acc, curr) => acc + curr.creditsRegistered, 0);
        
        academicRecord.cumulativeGPA = totalCumulativeCredits > 0 ? (totalCumulativePoints / totalCumulativeCredits) : 0;
        academicRecord.retakeUnits = [...new Set([...academicRecord.retakeUnits, ...unitsFailed])];
        
        if (academicRecord.cumulativeGPA < 2.0) {
            academicRecord.academicStanding = 'Probation';
        }

        await academicRecord.save();

        res.status(200).json({ 
            message: 'Results processed successfully', 
            semesterGPA, 
            cumulativeGPA: academicRecord.cumulativeGPA 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Academic Records (Rigor Per Student Report)
// @route   GET /api/academics/records/:studentId
export const getStudentAcademicRecords = async (req, res) => {
    try {
        const record = await AcademicRecord.findOne({ student: req.params.studentId })
            .populate('student', 'name admissionNumber')
            .populate('program', 'name code')
            .populate('retakeUnits', 'name code');

        if (!record) return res.status(404).json({ message: 'Academic record not found' });

        res.status(200).json({
            studentDetails: record.student,
            program: record.program,
            cumulativeGPA: record.cumulativeGPA,
            standing: record.academicStanding,
            semesterHistory: record.semesterHistory,
            retakesPending: record.retakeUnits
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};