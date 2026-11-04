import UnitRegistration from '../models/unitRegistrationModel.js';
import Program from '../models/programModel.js';
import CourseUnit from '../models/courseUnitModel.js';

// @desc    Register for units (Checks cap and 6 unit limit)
// @route   POST /api/registrations
export const registerUnits = async (req, res) => {
    try {
        const { studentId, programId, academicYear, semester, unitIds } = req.body;

        // 1. Check if student already has a registration for this term
        let registration = await UnitRegistration.findOne({ student: studentId, academicYear, semester });

        if (registration) {
            return res.status(400).json({ message: 'Already registered for this semester. Use the Add/Drop endpoint.' });
        }

        // 2. Check Program Cap ("put a cap")
        const program = await Program.findById(programId);
        if (!program) return res.status(404).json({ message: 'Program not found' });
        
        if (program.currentEnrollment >= program.maxCapacity) {
            return res.status(400).json({ message: 'Program capacity reached. Registration closed.' });
        }

        // 3. Check 6 Unit Limit
        if (unitIds.length > program.maxUnitsPerSemester) {
            return res.status(400).json({ 
                message: `Cannot register more than ${program.maxUnitsPerSemester} units per term.` 
            });
        }

        // 4. Create Registration
        const registeredUnits = unitIds.map(id => ({ courseUnit: id }));
        
        registration = await UnitRegistration.create({
            student: studentId,
            program: programId,
            academicYear,
            semester,
            registeredUnits,
            totalUnits: unitIds.length,
            registrationStatus: 'Approved'
        });

        // 5. Update Program Enrollment Count (Increment)
        program.currentEnrollment += 1;
        await program.save();

        res.status(201).json(registration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add or Drop a unit
// @route   PUT /api/registrations/:id/modify
export const addOrDropUnit = async (req, res) => {
    try {
        const { action, unitId } = req.body; // action: 'add' or 'drop'
        const registration = await UnitRegistration.findById(req.params.id).populate('program');

        if (!registration) return res.status(404).json({ message: 'Registration record not found' });

        const maxUnits = registration.program.maxUnitsPerSemester;

        if (action === 'add') {
            if (registration.registeredUnits.filter(u => u.status === 'Active').length >= maxUnits) {
                return res.status(400).json({ message: `Maximum of ${maxUnits} active units allowed.` });
            }
            // Check if unit is already there but dropped
            const existingUnit = registration.registeredUnits.find(u => u.courseUnit.toString() === unitId);
            if (existingUnit) {
                existingUnit.status = 'Active'; // Reactivate
            } else {
                registration.registeredUnits.push({ courseUnit: unitId, status: 'Active' });
            }
        } else if (action === 'drop') {
            const unit = registration.registeredUnits.find(u => u.courseUnit.toString() === unitId);
            if (unit) unit.status = 'Dropped'; // Don't delete, just mark as dropped for records
        }

        // Recalculate total active units
        registration.totalUnits = registration.registeredUnits.filter(u => u.status === 'Active').length;
        
        await registration.save();
        res.status(200).json({ message: `Unit successfully ${action}ed`, registration });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};