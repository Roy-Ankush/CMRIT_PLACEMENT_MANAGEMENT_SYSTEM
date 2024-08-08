import express from 'express';
import multer from 'multer';
import Drive from '../models/drive.js'; // Import the Drive model

const router = express.Router();

// Set up Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/api/user/drives',  upload.array('uploads', 10), async (req, res) => {
  try {

    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.files);

    const newDriveData=({

      batch: req.body.batch,
      company: req.body.company,
      criteria: req.body.criteria,
      registrationLink: req.body.registrationLink,
    });

    if (req.files && req.files.length > 0) {
      newDriveData.files = req.files.map(file => ({
        data: file.buffer,
        contentType: file.mimetype,
        fileName: file.originalname,
      }));
    }

    const newDrive = new Drive(newDriveData);
    await newDrive.save();

    // console.log('Response Data:', { message: 'Form data saved successfully!' });
    res.status(200).json({ message: 'Form data saved successfully!' });
  } catch (err) {
    // console.error('Error saving form data:', err.message);
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

router.get('/api/user/drives/:id/files', async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id);

    const files = drive.files.map(file => ({
      url: `http://localhost:8000/api/user/drives/${req.params.id}/files/${file.fileName}`,
      contentType: file.contentType,
      fileName: file.fileName
    }));
    
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ message: `Error fetching file: ${err.message}` });
  }
});

router.get('/api/user/drives/:id/files/:fileName', async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id);
    const file = drive.files.find(file => file.fileName === req.params.fileName);
    
    if (!file) {
      return res.status(404).json({ message: 'File not found.' });
    }
    
    res.set('Content-Type', file.contentType);
    res.send(file.data);
  } catch (err) {
    res.status(500).json({ message: `Error fetching file: ${err.message}` });
  }
});

router.delete('/api/user/drives/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Drive.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Drive not found' });
    }
    res.status(200).json({ message: 'Drive deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting drive', error });
  }
});



export default router;
