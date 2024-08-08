import express from 'express'
import { verifyToken } from '../middleware/auth.js';
import student from '../models/student.js'
const router=express.Router()


router.get("/api/user/student", verifyToken, async (req, res) => {
    try {
        const userID=req.user.id
        // console.log("user is :-",userID)
        const user=await student.findOne({ _id: userID })
        // console.log(user.email)
        return res.status(200).json({valid:true,email:user.email})//need to add some terniary operator
    } catch (error) {
        console.log("error in student page")
        console.log(error)
    }
  });
  
  export default router;