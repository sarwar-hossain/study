// studentRoutes.js
const express = require('express');
const router = express.Router();
const { Student } = require('./../models');

// 👉 Fetch All Students
router.get('/', async (req, res) => {
    try {
        const studentDataList = await Student.find();
        res.json(studentDataList);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching student collection' });
    }
});

// 👉 Insert New Student
router.post('/', async (req, res) => {
    try {
        const { name, roll, section, stream, college } = req.body;

        if (!name || !roll || !section || !stream || !college) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const newStudent = new Student({ name, roll, section, stream, college });
        await newStudent.save();
        res.json({ message: 'Student added successfully', newStudent });
    } catch (error) {
        res.status(500).json({ error: 'Failed to insert student data' });
    }
});

// 👉 Delete Student by ID
router.delete('/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        console.log('Deleting student with ID:', studentId);

        // Check if the ID is valid
        if (!studentId || studentId.length !== 24) {
            return res.status(400).json({ error: 'Invalid student ID' });
        }

        const deletedStudent = await Student.findByIdAndDelete(studentId);

        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Student deleted successfully', deletedStudent });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Failed to delete student' });
    }
});

// 👉 Fetch Single Student by ID
router.get('/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json(student);
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ error: 'Failed to fetch student' });
    }
});

// 👉 Update Student
router.put('/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const { name, roll, section, stream, college } = req.body;

        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            { name, roll, section, stream, college },
            { new: true } // Return the updated document
        );

        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Student updated successfully', updatedStudent });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ error: 'Failed to update student' });
    }
});

module.exports = router;