import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jwt, { decode } from 'jsonwebtoken'
import student from '../models/student.js'
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

app.post("/register", async (req, res) => {
  try {
    const {email,password,confirm_password}=req.body;
    if (password === confirm_password) {
      const registeradmin = new student({email,password,confirm_password})
      // after getting details and before storing it into DB use hashing
      // here the pre method comes in action
      // generate token with the help of jwt so creacte a async funcion in schema or models page and call it here.
      const existingUser = await student.findOne({ email});
      if (existingUser) {
        console.log("Email already exists");
        return res.status(400).send("Email already exists");
      }else{
        const result = await registeradmin.save();
        console.log("data saved")
        console.log(result)
        // console.log(result._id);
      }
     
    }else{
        console.log("incorrect password")
      res.send("incorrect password")
    }
  } catch (error) {
    res.send(error);
  }
})


app.post('/login', async (req, res) => {
  try {
    // const {email ,password}=req.body   way to destructure 
    const email = req.body.email;
    const password = req.body.password
    const useremail = await student.findOne({ email })
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