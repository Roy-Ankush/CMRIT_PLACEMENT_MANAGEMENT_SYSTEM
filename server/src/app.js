import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jwt, { decode } from 'jsonwebtoken'
import student from '../models/student.js'
import teacher from '../models/teacher.js'
import bcrypt from "bcrypt";
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
  origin:["http://localhost:5173"],
  credentials:true
}
))
//Database connectivity
const connectionString = "mongodb://127.0.0.1:27017/cmrit";
const connect_Database = async () => {
  try {
    const client = await mongoose.connect(connectionString, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    

    });
    console.log(`Connected to MongoDB.....`);
    return client;

  } catch (error) {
    console.error(error)
    process.exit(1);
  }
}
// The below function is responsible for the connection of database
connect_Database()


const studentEmailRegex = /^[a-z]{4}([0-9]{2})([a-z]{2})@cmrit\.ac\.in$/;
const teacherEmailRegex = /^([a-z]+(\.[a-z]+)*)\.(.)@cmrit\.ac\.in$/;

app.post("/register", async (req, res) => {
  try {
    const { email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
      console.log("Incorrect password");
      return res.status(400).send("Passwords do not match");
    }

    // Determine if the email belongs to a student or a teacher
    let isStudent = studentEmailRegex.test(email);
    let isTeacher = teacherEmailRegex.test(email);

    if (!isStudent && !isTeacher) {
      console.log("Invalid email format");
      return res.status(400).send("Invalid email format");
    }

    const userModel = isStudent ? student : teacher;
    
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      console.log("Email already exists");
      return res.status(400).send("Email already exists");
    }

    const newUser = new userModel({ email, password,confirm_password });

    // Save the new user
    const result = await newUser.save();
    console.log("Data saved");
    console.log(result);
    
    return res.status(201).send("Registration successful");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred during registration");
  }
});



app.post('/login', async (req, res) => {
  try {
    // const {email ,password}=req.body   way to destructure 
    const { email, password } = req.body;

    // Search in both student and teacher collections
    const studentUser = await student.findOne({ email });
    const teacherUser = await teacher.findOne({ email });

    // Determine if user exists and get user details
    const useremail = studentUser || teacherUser;

    if (!useremail) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }
    // console.log(useremail) return all the details matching with that email
    // console.log(useremail.password)
    if (useremail) {
      const userpassword = useremail.password
      const ismatch=await bcrypt.compare(password,userpassword)
      // console.log(ismatch)
      if (ismatch) {
        console.log("pass matched")
        // as the password are matched now we are going to generate 2 token access and refresh tokens
        const accessToken = jwt.sign({email: email}, 
          "jwt-access-token-secret-key", {expiresIn: '1m'})
      const refreshToken = jwt.sign({email: email}, 
          "jwt-refresh-token-secret-key", {expiresIn: '5m'})

      res.cookie('accessToken', accessToken, {maxAge: 60000})

      res.cookie('refreshToken', refreshToken, 
          {maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict'})
        res.json({ accessToken, refreshToken,Login:true });
        console.log("user authemticated(given credentials matchde)")
        // return res.json({Login:true})
      }else{
        console.log("Invalid credentials")
        // res.send("try again with valid credentials")
           res.json({Login:false})
      }
    } else {
      console.log("email not found in db")
      res.send("Given credentials are not matched ")
    }
  } catch (error) {
    // always log the error 
    console.log(error)
    // res.send("login credentials do not match please try again")
  }

})

const varifyUser = (req, res, next) => {
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

app.get('/student',varifyUser, (req, res) => {
  return res.json({valid: true, message: "authorized"})
})

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
  })