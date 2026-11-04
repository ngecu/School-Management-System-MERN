import Program from '../models/programModel.js';
import Department from '../models/departmentModel.js';
import Student from '../models/studentModel.js';

// @desc    Create a new Program (with a cap)
// @route   POST /api/programs
export const createProgram = async (req, res) => {
  try {
    const {
      name,
      code,
      department,          // _id from dropdown
      level,
      maxCapacity,
      maxUnitsPerSemester,
      durationInSemesters, // ← must be included
    } = req.body;

    if (!durationInSemesters) {
      return res.status(400).json({ message: 'Duration (semesters) is required' });
    }

    const programExists = await Program.findOne({ code: code.toUpperCase() });
    if (programExists) {
      return res.status(400).json({ message: 'Program code already exists' });
    }

    const program = await Program.create({
      name,
      code,
      department,
      level,
      maxCapacity,
      maxUnitsPerSemester,
      durationInSemesters,
    });

    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all programs
// @route   GET /api/programs
export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find({})
      .populate('department', 'name code')   // keep — department IS an ObjectId ref
      .sort({ createdAt: -1 });
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get details of a specific program (Report)
// @route   GET /api/programs/:id
export const getProgramDetails = async (req, res) => {
    try {
        const program = await Program.findById(req.params.id)
            .populate('department', 'name code')
            .populate('school', 'name');

        if (!program) return res.status(404).json({ message: 'Program not found' });

        // Calculate available slots
        const availableSlots = program.maxCapacity - program.currentEnrollment;

        res.status(200).json({
            programDetails: program,
            availableSlots,
            isFull: availableSlots <= 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};