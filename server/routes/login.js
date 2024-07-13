import express from 'express'
import jwt, { decode } from 'jsonwebtoken'
import student from '../models/student.js'
import teacher from '../models/teacher.js';
import User from '../models/role.js';
import bcrypt from "bcrypt";
const router = express.Router()
import dotenv from 'dotenv'
dotenv.config()

const studentEmailRegex = /^[a-z]{4}([0-9]{2})([a-z]{2})@cmrit\.ac\.in$/;
const teacherEmailRegex = /^([a-z]+(\.[a-z]+)*)\.(.)@cmrit\.ac\.in$/;
router.post('/api/user/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    
    let isStudent = studentEmailRegex.test(email);
    let isTeacher = teacherEmailRegex.test(email);

    let studentUser, teacherUser,userrole

    if (isStudent) {
      studentUser = await student.findOne({ email });
    }
    else if (isTeacher) {
      teacherUser = await teacher.findOne({ email });
    }
    let role_exist
    let new_role
    if(role!='student'){
      userrole=await User.findOne({ email });
      role_exist=userrole
      if(!role_exist){
        console.log("select proper role")
        return res.status(404).json({ message: "User role is wrong" });
      }
    }else{
      new_role=student
    }
    // Determine if user exists and get user details
    const useremail = studentUser || teacherUser
   

    
    if (!useremail) {
      return res.status(404).json({ message: "User not found please register" });
    }
    if (useremail) {
      const userpassword = useremail.password
      // const userpassword = useremail ? useremail.password : null;
      if (!userpassword) {
        return res.status(401).send("password not matched")
      }
        const ismatch = await bcrypt.compare(password, userpassword)
        if (ismatch) {
          // as the password are matched now we are going to generate 2 token access and refresh tokens
          const accessToken = jwt.sign({ email: email },
            "jwt-access-token-secret-key", { expiresIn: '1m' })
          const refreshToken = jwt.sign({ email: email },
            "jwt-refresh-token-secret-key", { expiresIn: '5m' })

          res.cookie('accessToken', accessToken, { maxAge: 60000 })

          res.cookie('refreshToken', refreshToken,
            { maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict' })

          return res.status(200).json({ accessToken, refreshToken, Login: true,roles:userrole?userrole.role:new_role});
        } else {
          return res.status(400).json({ Login: false })
        }
      }
     else {
      return res.status(400).json({ Email: false })
    }
  } catch (error) {
    console.log(error)
  }

})

export default router;