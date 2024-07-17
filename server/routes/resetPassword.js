import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import student from '../models/student.js';
import teacher from '../models/teacher.js';

const router = express.Router();

router.post("/api/user/resetPassword/:id/:token", async (req, res) => {
  try {
    console.log('Processing request...');
    const { id, token } = req.params;
    const { password, confirm_password } = req.body;

    if (password !== confirm_password) {
      return res.status(400).json({ setpassword: false, message: "Passwords do not match" });
    }

    // Verify the token
    jwt.verify(token,"secretkeyisthere", async (err, decode) => {
      if (err) {
        console.error("Token verification failed:", err);
        return res.status(400).json({ status: "error with token" });
      } else {
        console.log("Token verified successfully, searching for user...");

        // Find the user by ID in both student and teacher collections
        let user;
        let userType;

        try {
          const studentUser = await student.findById(id);
          const teacherUser = await teacher.findById(id);

          if (studentUser) {
            user = studentUser;
            userType = 'student';
          } else if (teacherUser) {
            user = teacherUser;
            userType = 'teacher';
          } else {
            console.error("User not found with ID:", id);
            return res.status(404).json({ message: "User not found" });
          }

          console.log(`User found (${userType}):`, user);

          // Hash the new password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Update the password in the correct collection
          if (userType === 'student') {
            await student.findByIdAndUpdate(id, { password: hashedPassword });
          } else if (userType === 'teacher') {
            await teacher.findByIdAndUpdate(id, { password: hashedPassword });
          }

          res.status(200).json({ status: "success" });
        } catch (err) {
          console.error("Error finding/updating user:", err);
          res.status(500).json({ status: "error", message: "Failed to update password" });
        }
      }
    });
  } catch (error) {
    console.error("Error processing reset password request:", error.message);
    res.status(500).json({ status: "failure", message: "An error occurred" });
  }
});

export default router;
