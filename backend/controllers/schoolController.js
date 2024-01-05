import School from '../models/schoolModel.js';

// Controller to insert a new school
export const createSchool = async (req, res) => {
  try {
    const { name } = req.body;
    const school = await School.create({ name });

    res.status(201).json({ success: true, data: school });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to get all schools with populated courses
export const getAllSchools = async (req, res) => {
  try {
    const schools = await School.find().populate('courses');
    res.status(200).json({ success: true, data: schools });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
