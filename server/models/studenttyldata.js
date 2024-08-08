import mongoose from 'mongoose';

const studenttyldataSchema = new mongoose.Schema({
  sno: String,
  name: String,
  email: String,
  usn: String,
  phoneNumber: String,
  coreCx: {
    c1: String, c2: String, c3: String, c4: String, c5: String,
    c6: String, c7: String, c8: String
  },
  coreProgramming: {
    cp1: String, cp2: String, cp3: String, cp4: String, cp5: String,
    cp6: String, cp7: String
  },
  aptitude: { a1: String, a2: String, a3: String },
  softSkills: { ss1: String, ss2: String, ss3: String },
  language: { l1: String, l2: String, l3: String, l4: String, l5: String },
  fsd: String, 
});

const StudentTyldata = mongoose.model('StudentTyldata', studenttyldataSchema);

export default StudentTyldata;
