import Department from '../models/departmentModel.js';
import Program from '../models/programModel.js';
import Student from '../models/studentModel.js';
import Lecturer from '../models/lecturerModel.js';
import School from '../models/schoolModel.js';

// @desc    Get Department Reports filtered by School
// @route   GET /api/reports/departments?schoolId=xxx
export const getDepartmentReports = async (req, res) => {
    try {
        const { schoolId } = req.query;

        if (!schoolId) {
            return res.status(400).json({ message: 'schoolId query parameter is required.' });
        }

        // Verify the school exists
        const school = await School.findById(schoolId);
        if (!school) {
            return res.status(404).json({ message: 'School not found.' });
        }

        // 1. Fetch only departments belonging to the selected school
        const departments = await Department.find({ school: schoolId });

        // 2. Aggregate Stats for each department
        const departmentStats = await Promise.all(
            departments.map(async (dept) => {
                const totalStudents = await Student.countDocuments({ department: dept._id });
                const totalPrograms = await Program.countDocuments({ department: dept._id });
                const totalLecturers = await Lecturer.countDocuments({ department: dept._id });

                // Placeholder — replace with real aggregation from AcademicRecord
                const averagePerformance = 'B';

                return {
                    _id: dept._id,
                    department: `${dept.name} (${dept.code})`,
                    totalStudents,
                    totalPrograms,
                    totalLecturers,
                    averagePerformance
                };
            })
        );

        // 3. Calculate Overall School Stats
        const totalDepartments = departments.length;
        const totalStudents = departmentStats.reduce((acc, curr) => acc + curr.totalStudents, 0);
        const totalPrograms = departmentStats.reduce((acc, curr) => acc + curr.totalPrograms, 0);

        const schoolStats = {
            schoolName: school.name,
            totalDepartments,
            totalStudents,
            totalPrograms
        };

        res.status(200).json({
            schoolStats,
            departments: departmentStats
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};