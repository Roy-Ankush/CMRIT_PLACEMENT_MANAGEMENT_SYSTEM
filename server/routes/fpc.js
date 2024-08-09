import express from 'express';
import higherOrderMiddleware from '../middleware/highermw.js';
import checkRole from '../middleware/checkrole.js';
import {verifyToken} from '../middleware/auth.js'
import teacher from '../models/teacher.js';
<<<<<<< HEAD

=======
>>>>>>> a40b8357c1bdcb553191cad56786e0b709bbe367
const router = express.Router();

router.get("/api/user/fpc",higherOrderMiddleware(verifyToken,checkRole),  async (req, res) => {
  try {
    const userID=req.user.id
<<<<<<< HEAD
    console.log("user is :-",userID)
    const user=await teacher.findOne({ _id: userID })
    console.log(user.email)
    return res.status(200).json({valid:true,email:user.email})
  } catch (error) {
=======
    // console.log("user is :-",userID)
    const user=await teacher.findOne({ _id: userID })
    // console.log(user.email)
    return res.status(200).json({valid:true,email:user.email})
  } 
  catch (error) {
>>>>>>> a40b8357c1bdcb553191cad56786e0b709bbe367
    console.log(error);
    return res.status(500).json({ valid: false, message: "Internal Server Error" });
  }
});

export default router;