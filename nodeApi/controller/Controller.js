const EmployeeCrud = require('../models/Model');

exports.getAllEmployee = async (req, res) => {
    try {
        const employees = await EmployeeCrud.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createEmployee = async (req, res) => {
    const employee = new EmployeeCrud({
        employee_name: req.body.employee_name,
        employee_salary: req.body.employee_salary
    });
    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await EmployeeCrud.findById(req.params.id);
        if (employee == null) {
            return res.status(404).json({ message: 'employee not found' });
        }
        res.json(employee);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const updateEmployee = await EmployeeCrud.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updateEmployee);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        await EmployeeCrud.findByIdAndDelete(req.params.id);
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

