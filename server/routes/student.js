import express from 'express'
import { verifyToken } from '../middleware/auth.js';
const router=express.Router()


router.get("/api/user/student", verifyToken, async (req, res) => {
    try {
        return res.status(200).json({valid:true})
    } catch (error) {
        console.log("error in student page")
        console.log(error)
    }
  });
  
  export default router;