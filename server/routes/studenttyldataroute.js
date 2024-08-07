import express from 'express';
import StudentTyldata from '../models/studenttyldata.js';

const router = express.Router();

// Add a new student
router.post('/api/students', async (req, res) => {
  try {
    const student = new StudentTyldata(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing student
router.put('/api/students/:id', async (req, res) => {
  try {
    const student = await StudentTyldata.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all students
router.get('/api/students', async (req, res) => {
  try {
    const students = await StudentTyldata.find();
    res.json(students);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a student by ID
router.get('/api/students/:id', async (req, res) => {
  try {
    const student = await StudentTyldata.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update student marks
router.patch('/api/students/:id/marks', async (req, res) => {
  try {
    const { coreCx, coreProgramming, aptitude, softSkills, language, fsd } = req.body;
    const student = await StudentTyldata.findById(req.params.id);

    if (!student) return res.status(404).json({ message: 'Student not found' });

    if (coreCx) student.coreCx = coreCx;
    if (coreProgramming) student.coreProgramming = coreProgramming;
    if (aptitude) student.aptitude = aptitude;
    if (softSkills) student.softSkills = softSkills;
    if (language) student.language = language;
    if (fsd) student.fsd = fsd;

    await student.save();
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


export default router;
