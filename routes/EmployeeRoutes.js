const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

router.get('/employees', async (req, res) => {
    try {const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error', error });
    }
});
router.post('/employees', async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;
    try {const newEmployee = new Employee({
            first_name,last_name, email, position, salary, date_of_joining, department
        });
        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully.', employee_id: newEmployee._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
});
router.get('/employees/:id', async (req, res) => {
    try {const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
router.put('/employees/:id', async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    try {const employee = await Employee.findByIdAndUpdate(req.params.id, {first_name, last_name, email, position, salary, date_of_joining, department
        }, { new: true });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee details updated successfully.', employee });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
router.delete('/employees', async (req, res) => {
    const { eid } = req.query;
    if (!eid) {
        return res.status(400).json({ message: 'Employee ID  is required' });
    }
    try {const employee = await Employee.findByIdAndDelete(eid);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
module.exports = router;
