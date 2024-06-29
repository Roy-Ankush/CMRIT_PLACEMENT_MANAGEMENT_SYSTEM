import express from 'express'
import jwt, { decode } from 'jsonwebtoken'
import student from '../models/student.js'
import teacher from '../models/teacher.js'
import bcrypt from "bcrypt";
const router=express.Router()
import dotenv from 'dotenv'
dotenv.config()

// const studentEmailRegex = /^[a-z]{4}([0-9]{2})([a-z]{2})@cmrit\.ac\.in$/;
// const teacherEmailRegex = /^([a-z]+(\.[a-z]+)*)\.(.)@cmrit\.ac\.in$/;
router.post('/api/user/login', async (req, res) => {
    try {
      const { email, password,role } = req.body;
      // console.log(role)
    //   let isStudent = studentEmailRegex.test(email);
    //   let isTeacher = teacherEmailRegex.test(email);
    //   let studentUser;
    //   let teacherUser;
    //   if(isStudent){
          const studentUser = await student.findOne({ email });
    //   }
    //   if(isTeacher){
          const teacherUser = await teacher.findOne({ email });
    //   }
      // Determine if user exists and get user details
      const useremail = studentUser || teacherUser;
  
      if (!useremail) {
        return res.status(404).json({ message: "User not found please register" });
      }
      if (useremail) {
        const userpassword = useremail.password
        if(!userpassword){
           return res.status(401).send("password not matched")
        }else{
        const ismatch=await bcrypt.compare(password,userpassword)
        if (ismatch) {
          // as the password are matched now we are going to generate 2 token access and refresh tokens
          const accessToken = jwt.sign({email: email}, 
            "jwt-access-token-secret-key", {expiresIn: '1m'})
        const refreshToken = jwt.sign({email: email}, 
            "jwt-refresh-token-secret-key", {expiresIn: '5m'})
  
        res.cookie('accessToken', accessToken, {maxAge: 60000})
  
        res.cookie('refreshToken', refreshToken, 
            {maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict'})

          return res.status(200).json({ accessToken, refreshToken,Login:true });
        }else{
            return res.status(400).json({Login:false})
        }
      }
      } else {
        return  res.status(400).json({Email:false})
      }
    } catch (error) {
      console.log(error)
    }
  
  })
  
  const verifyUser = (req, res, next) => {
    const accesstoken = req.cookies.accessToken;
    if(!accesstoken) {
        if(renewToken(req, res)) {
            next()
        }
    } else {
        jwt.verify(accesstoken, 'jwt-access-token-secret-key', (err ,decoded) => {
            if(err) {
                return res.json({valid: false, message: "Invalid Token"})
            } else {
                req.email = decoded.email
                next()
            }
        })
    }
  }
  
  const renewToken = (req, res) => {
    const refreshtoken = req.cookies.refreshToken;
    let exist = false;
    if(!refreshtoken) {
        return res.json({valid: false, message: "No Refresh token"})
    } else {
        jwt.verify(refreshtoken, 'jwt-refresh-token-secret-key', (err ,decoded) => {
            if(err) {
                return res.json({valid: false, message: "Invalid Refresh Token"})
            } else {
                const accessToken = jwt.sign({email: decoded.email}, 
                    "jwt-access-token-secret-key", {expiresIn: '1m'})
                res.cookie('accessToken', accessToken, {maxAge: 60000})
                exist = true;
            }
        })
    }
    return exist;
  }
  router.get("/api/user/student",verifyUser, async (req, res) => {
    try {
        return res.status(200).json({valid:true})
    } catch (error) {
        console.log(error)
    }
  });
  router.get("/api/user/fpc",verifyUser, async (req, res) => {
    try {
        return res.status(200).json({valid:true})
    } catch (error) {
        console.log(error)
    }
  });
  export default router;