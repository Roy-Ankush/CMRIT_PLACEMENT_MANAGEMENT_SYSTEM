import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors'
import { createRequire } from 'module';
import cookieParser from 'cookie-parser'
import register from "../routes/register.js";
import login from "../routes/login.js";
import student from '../routes/student.js';
import fpc from "../routes/fpc.js"
// import Mark_verification from "../routes/Mark_verification.js";
import forgotPassword from "../routes/forgotPassword.js"
import resetPassword from "../routes/resetPassword.js"
import drives from "../routes/drives.js"
// import checkRole from '../middleware/checkrole.js';

const requireCjs = createRequire(import.meta.url);
const Mark_verification = requireCjs('../routes/Mark_verification.cjs');


const app = express();
console.log(process.env.PORT)
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
  origin:["http://localhost:5173"],
  credentials:true,
  methods:"GET,PUT,POST,DELETE"
}
))


//Database connectivity
const connectionString = "mongodb+srv://kumarankitverma5:test123@cluster0.bvgikdc.mongodb.net/CMR?retryWrites=true&w=majority&appName=Cluster0";
const connect_Database = async () => {
  try {
    const client = await mongoose.connect(connectionString, { });
    console.log(`Connected to MongoDB.....`);
    return client;
  } catch (error) {
    console.error(error)
    process.exit(1);
  }
}
connect_Database()



app.use('/',register)
app.use('/',login)
app.use('/',student)
app.use('/',fpc)
app.use('/',forgotPassword)
app.use('/',resetPassword)
app.use('/',Mark_verification)
app.use('/',drives)


app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
  })