import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'

import School from './models/schoolModel.js';
import Course from './models/courseModel.js';

import {connectDB} from './config/db.js'
import schools from './data/schools.js'
import courses from './data/courses.js';

dotenv.config()

connectDB()


const importData = async () => {
  try {
    await Course.deleteMany();
    await School.deleteMany();

    const createdSchools = await School.insertMany(schools);

    const createdCourses = [];

    for (const school of createdSchools) {
      const school_id = school._id;

      const schoolCourses = courses.map((course) => ({
        ...course,
        school: school_id,
      }));

      const createdCoursesForSchool = await Course.insertMany(schoolCourses);
      createdCourses.push(...createdCoursesForSchool);

      // Update the school's courses array with the created course IDs
      await School.findByIdAndUpdate(school_id, { $push: { courses: { $each: createdCoursesForSchool } } });
    }

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Course.deleteMany();
    await School.deleteMany();

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
