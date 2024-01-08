import SchoolFees from "../../models/schoolFeesModel.js";
import Student from "../../models/studentModel.js";
import {v4} from 'uuid'

export const createFees = async () => {
    try {
        console.log("looking for students");
      const students = await Student.find();
  
      for (const student of students) {
    
        const studentId = student._id;
  
        // Check if school fees already exist for the student
        const existingFees = await SchoolFees.findOne({ student: studentId });
  
        if (!existingFees) {
          // If school fees don't exist, create them
          await SchoolFees.create({
            student: studentId,
            amount: 30000,
            dueDate: 2024-30-12,
            transactionId:v4()
          });
          console.log('School fees created successfully.');

        }
      }
  
    } catch (error) {
      console.error('Error creating school fees:', error);
    }
  };