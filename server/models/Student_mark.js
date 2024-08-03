const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  usn: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, enum: ['Verified', 'Not Verified'], required: true }
});

const Student_mark = mongoose.model('Marks_verifications', studentSchema);

export default Student_mark;
