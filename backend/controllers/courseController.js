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

export const getAllCourseBySchool = async (req, res) => {
  try {
    const {schoolID} = req.params
    const courses = await Course.find({school:schoolID}).populate('school');
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

// Controller to get a single course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('school');
    if (!course) {
      res.status(404).json({ success: false, error: 'Course not found' });
      return;
    }

    const courseUnits = await CourseUnit.find({ course: course._id });
    const newCourse = { ...course.toObject(), courseUnits };

    res.status(200).json({ success: true, data: newCourse });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to update an existing course
export const updateCourse = async (req, res) => {
  try {
    const { name, description, school } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      res.status(404).json({ success: false, error: 'Course not found' });
      return;
    }

    course.name = name;
    course.description = description;
    course.school = school;

    const updatedCourse = await course.save();

    res.status(200).json({ success: true, data: updatedCourse });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to delete a course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      res.status(404).json({ success: false, error: 'Course not found' });
      return;
    }

    await course.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


