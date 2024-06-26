import dotenv from 'dotenv'
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import register from "../routes/register.js";
import login from "../routes/login.js";
import student from '../routes/student.js';
import fpc from "../routes/fpc.js"

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
const connectionString = "mongodb+srv://kumarankitverma5:test123@cluster0.bvgikdc.mongodb.net/CMR";
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


app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
  })