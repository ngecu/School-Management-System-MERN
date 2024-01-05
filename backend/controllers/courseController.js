import Course from '../models/courseModel.js';

// Controller to insert a new course
export const createCourse = async (req, res) => {
  try {
    const { name, description, school } = req.body;
    const course = await Course.create({ name, description, school });

    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to get all courses with populated school data
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('school');
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
