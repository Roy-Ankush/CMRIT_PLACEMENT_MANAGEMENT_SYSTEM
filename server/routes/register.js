import express from 'express'
const router=express.Router()

import student from '../models/student.js'
import teacher from '../models/teacher.js'
import { generateToken } from '../middleware/auth.js';


const studentEmailRegex = /^[a-z]{4}([0-9]{2})([a-z]{2})@cmrit\.ac\.in$/;
const teacherEmailRegex = /^([a-z]+(\.[a-z]+)*)\.(.)@cmrit\.ac\.in$/;

router.post("/register", async (req, res) => {
    try {
      const { email,password } = req.body;
      // Determine if the email belongs to a student or a teacher
      let isStudent = studentEmailRegex.test(email);
      let isTeacher = teacherEmailRegex.test(email);
      const userModel = isStudent ? student : teacher; 
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        // 409 code for conflict
        return res.status(409).json({error:"email already exist"});
      }
      //checking weather the password given at the time of register is right or wrong
      if(isStudent){
        if (process.env.STUDENT_PASSWORD !==password) {
          return res.status(401).json({error:"password not match"});
        }
      }else if(isTeacher){
        if (process.env.STAFF_PASSWORD !==password) {
          return res.status(401).json({error:"password not match"});
        }
      }
      // Trying to register using personal email
      if (!isStudent && !isTeacher) {
        return res.status(422).json({ email: false, error: 'Invalid email' });
      }

      //create newuser and save the newuser in database
      const newUser = new userModel({ email,password });
      const response = await newUser.save();
      const payload={
        id:response.id,
        email:response.email
      }
      const token=generateToken(payload);
      return res.status(201).json({response,token});
    } catch (error) {
      console.log(error);
      res.status(500).json({error:"Internal server error"});
    }
  });
  
  export default router;