// routes/students.js
import express from 'express';
import StudentTyldata from '../models/studenttyldata.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Add a new student
router.post('/api/user/students', async (req, res) => {
  try {
    const student = new StudentTyldata(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing student
router.put('/api/user/students/:id', async (req, res) => {
  try {
    const student = await StudentTyldata.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all students
router.get('/api/user/students', async (req, res) => {
  try {
    const students = await StudentTyldata.find();
    res.json(students);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a student by ID
router.get('/api/user/students/:id', async (req, res) => {
  try {
    const student = await StudentTyldata.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update student marks
// routes/students.js
router.patch('/api/user/students/:id/marks', async (req, res) => {
  try {
    const { coreCx, coreProgramming, aptitude, softSkills, language, fsd } = req.body;
    const student = await StudentTyldata.findById(req.params.id);

    if (!student) return res.status(404).json({ message: 'Student not found' });

    if (coreCx) student.coreCx = coreCx;
    if (coreProgramming) student.coreProgramming = coreProgramming;
    if (aptitude) student.aptitude = aptitude;
    if (softSkills) student.softSkills = softSkills;
    if (language) student.language = language;
    if (fsd !== undefined) student.fsd = fsd; // Ensure fsd is treated as a string

    await student.save();
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//get student data  , for displaying in student tyl tab
router.get('/api/studentdata',verifyToken, async (req, res) => {
  try {
    const email = req.user.email;
    const studentData = await StudentTyldata.findOne({ email: email }); // You can modify this to find a specific student
    res.json(studentData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
