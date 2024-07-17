import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken'
import express from 'express';
import student from '../models/student.js';
import teacher from '../models/teacher.js';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const router = express.Router();

const studentEmailRegex = /^[a-z]{4}[0-9]{2}[a-z]{2}@cmrit\.ac\.in$/;
const teacherEmailRegex = /^[a-z]+(\.[a-z]+)*\.[a-z]@cmrit\.ac\.in$/;

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN, EMAIL_USER } = process.env;

// console.log(CLIENT_ID); 
// console.log(CLIENT_SECRET); 
// console.log(REDIRECT_URI);
// console.log(REFRESH_TOKEN); 

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(email, link) {
  try {
    const accessTokenResponse = await oAuth2Client.getAccessToken();
    const accessToken = accessTokenResponse?.token;

    if (!accessToken) {
      throw new Error('Failed to obtain access token');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: EMAIL_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `Your App <${EMAIL_USER}>`,
      to: email,
      subject: 'Reset Password',
      text: `Click the following link to reset your password: ${link}`,
      html: `<p>Click the following link to reset your password: <a href="${link}">${link}</a></p>`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

router.post("/api/user/forgotPassword", async (req, res) => {
  try {
    console.log('Processing request...'); // Track progress
    const { email } = req.body;

    let isStudent = studentEmailRegex.test(email);
    let isTeacher = teacherEmailRegex.test(email);

    let studentUser, teacherUser;

    if (isStudent) {
      studentUser = await student.findOne({ email });
    } else if (isTeacher) {
      teacherUser = await teacher.findOne({ email });
    }

    const user = studentUser || teacherUser;
    if (!user) {
      return res.status(404).json({ message: "Invalid email" });
    }
    
    const token=jwt.sign({id:user._id},"secretkeyisthere",{expiresIn:"120s"})
    // Generate a password reset link (e.g., including a token)
    const resetLink = `http://localhost:5173/resetPassword/${user._id}/${token}`;
    await sendMail(email, resetLink);

    res.status(200).json({ message: 'Password reset email sent.' });
  } catch (error) {
    console.error("Error processing forgot password request:", error.message);
    res.status(500).json({ status: "failure", message: "An error occurred" });
  }
});

export default router;
