import express from 'express';
import multer from 'multer';
import Drive from '../models/drive.js'; // Import the Drive model

const router = express.Router();

// Set up Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route to handle form submission
// router.post('/api/user/drives', upload.single('upload'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({message:'No file uploaded.'});
//     }

//     // Create a new Drive instance
//     const newDrive = new Drive({
//       topic: req.body.topic,
//       batch: req.body.batch,
//       company: req.body.company,
//       criteria: req.body.criteria,
//       file: {
//         data: req.file.buffer,
//         contentType: req.file.mimetype,
//         fileName: req.file.originalname,
//       },
//     });

//     // Save the data to MongoDB
//     await newDrive.save();

//     res.status(201).json({ message: 'Form data saved successfully!' });
//   } catch (err) {
//     res.status(500).json({ message: `Error saving form data: ${err.message}` });
//   }
// });
router.post('/api/user/drives', upload.single('upload'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    const newDrive = new Drive({
      topic: req.body.topic,
      batch: req.body.batch,
      company: req.body.company,
      criteria: req.body.criteria,
      file: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        fileName: req.file.originalname,
      },
    });

    await newDrive.save();

    console.log('Response Data:', { message: 'Form data saved successfully!' });
    res.status(200).json({ message: 'Form data saved successfully!' });
  } catch (err) {
    console.error('Error saving form data:', err.message);
    res.status(500).json({ message: `Error saving form data: ${err.message}` });
  }
});


router.get('/api/user/drives', async (req, res) => {
  try {
    const drives = await Drive.find(); // Fetch all drives from the database
    res.status(200).json(drives);
  } catch (err) {
    res.status(500).json({ message: `Error fetching drives: ${err.message}` });
  }
});

router.get('/api/user/drives/:id/file', async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id);
    if (!drive || !drive.file) {
      return res.status(404).json({ message: 'File not found.' });
    }

    res.set('Content-Type', drive.file.contentType);
    res.send(drive.file.data);
  } catch (err) {
    res.status(500).json({ message: `Error fetching file: ${err.message}` });
  }
});


export default router;
