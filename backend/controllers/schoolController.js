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
    console.log("fetching all schools");
    const schools = await School.find().populate('courses');
    res.status(200).json({ success: true, data: schools });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getSchoolById = async (req, res) => {
  try {
    const { id } = req.params;
    const school = await School.findById(id).populate('courses');

    if (!school) {
      res.status(404).json({ success: false, error: 'School not found' });
    } else {
      res.status(200).json({ success: true, data: school });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to update a specific school by ID
export const updateSchoolById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const school = await School.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!school) {
      res.status(404).json({ success: false, error: 'School not found' });
    } else {
      res.status(200).json({ success: true, data: school });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to delete a specific school by ID
export const deleteSchoolById = async (req, res) => {
  try {
    const { id } = req.params;
    const school = await School.findByIdAndDelete(id);

    if (!school) {
      res.status(404).json({ success: false, error: 'School not found' });
    } else {
      res.status(200).json({ success: true, data: {} });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
