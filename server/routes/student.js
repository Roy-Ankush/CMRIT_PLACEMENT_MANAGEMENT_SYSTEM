import express from 'express'
import { verifyToken } from '../middleware/auth.js';
<<<<<<< HEAD
import student from '../models/student.js'
=======
import student from '../models/student.js';
>>>>>>> a40b8357c1bdcb553191cad56786e0b709bbe367
const router=express.Router()


router.get("/api/user/student", verifyToken, async (req, res) => {
    try {
        const userID=req.user.id
        // console.log("user is :-",userID)
        const user=await student.findOne({ _id: userID })
        // console.log(user.email)
<<<<<<< HEAD
        return res.status(200).json({valid:true,email:user.email})//need to add some terniary operator
    } catch (error) {
=======
        return res.status(200).json({valid:true,email:user.email})
      } 
     catch (error) {
>>>>>>> a40b8357c1bdcb553191cad56786e0b709bbe367
        console.log("error in student page")
        console.log(error)
    }
  });
  

  export default router;