const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  usn: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, enum: ['Verified', 'Not Verified'], required: true },
  resumeLink: { type: String, required: true },
  videoResumeLink: { type: String, required: true },
  tenthMarksLink: { type: String, required: true },
  twelfthMarksLink: { type: String, required: true },
  ugMarksLink: { type: String, required: true }, // Add this line
  panLink: { type: String, required: true },
  aadharLink: { type: String, required: true },
  passportLink: { type: String },
  photoLink: { type: String, required: true },
  collegeIdLink: { type: String, required: true }
});

const Student_mark = mongoose.model('Marks_verifications', studentSchema);

module.exports = Student_mark;
