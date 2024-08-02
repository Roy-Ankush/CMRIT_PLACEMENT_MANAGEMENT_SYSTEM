import express from 'express'
const router=express.Router()

import student from '../models/student.js'
import teacher from '../models/teacher.js'

const studentEmailRegex = /^[a-z]{4}([0-9]{2})([a-z]{2})@cmrit\.ac\.in$/;
const teacherEmailRegex = /^([a-z]+(\.[a-z]+)*)\.(.)@cmrit\.ac\.in$/;

router.post("/api/user/register", async (req, res) => {
    try {
      const { email,password } = req.body;
      // Determine if the email belongs to a student or a teacher
      let isStudent = studentEmailRegex.test(email);
      let isTeacher = teacherEmailRegex.test(email);
      const userModel = isStudent ? student : teacher; 
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        // 409 code for conflict
        return res.status(409).send("Email already exists");
      }
      if(isStudent){
        if (process.env.STUDENT_PASSWORD !==password) {
          return res.status(401).send("Passwords do not match");
        }
      }else if(isTeacher){
        if (process.env.STAFF_PASSWORD !==password) {
          return res.status(401).send("Passwords do not match");
        }
      }
      // trying to register using personal email
      if (!isStudent && !isTeacher) {
        return res.status(422).json({ email: false, message: 'Invalid email' });
      }
      const newUser = new userModel({ email,password });
      // Save the new user
      const result = await newUser.save();
      return res.status(201).send("Registration successful");
    } catch (error) {
      console.log(error);
      res.status(500).send("An error occurred during registration");
    }
  });
  
  export default router;