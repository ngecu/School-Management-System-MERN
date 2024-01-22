import Course from '../models/courseModel.js';
import CourseUnit from '../models/courseUnitModel.js';

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
    const newCourses = await Promise.all(
      courses.map(async (element) => {
        const courseUnits = await CourseUnit.find({ course: element._id });
        return { ...element.toObject(), courseUnits };
      })
    );

    res.status(200).json({ success: true, data: newCourses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

