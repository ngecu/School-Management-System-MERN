import Department from '../models/departmentModel.js';
import Program from '../models/programModel.js';

// @desc    Get all departments
// @route   GET /api/departments
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({}).sort({ name: 1 });
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single department
// @route   GET /api/departments/:id
export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create department
// @route   POST /api/departments
export const createDepartment = async (req, res) => {
  try {
    const { name, code, description, school } = req.body;

    if (!school) {
      return res.status(400).json({ message: 'School is required' });
    }

    const codeExists = await Department.findOne({ code: code.toUpperCase() });
    if (codeExists) {
      return res.status(400).json({ message: 'Department code already exists' });
    }

    const department = await Department.create({
      name,
      code: code.toUpperCase(),
      description,
      school,
    });

    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const { name, code, description, school } = req.body;

    if (code && code.toUpperCase() !== department.code) {
      const codeExists = await Department.findOne({ code: code.toUpperCase() });
      if (codeExists) {
        return res.status(400).json({ message: 'Department code already exists' });
      }
    }

    department.name = name ?? department.name;
    department.code = code ? code.toUpperCase() : department.code;
    department.description = description ?? department.description;
    department.school = school ?? department.school;

    const updated = await department.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// @desc    Delete department
// @route   DELETE /api/departments/:id
export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Safety check — refuse if programs reference this department
    const linkedPrograms = await Program.countDocuments({
      department: department._id,
    });
    if (linkedPrograms > 0) {
      return res.status(400).json({
        message: `Cannot delete: ${linkedPrograms} program(s) still belong to this department.`,
      });
    }

    await department.deleteOne();
    res.status(200).json({ message: 'Department removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};