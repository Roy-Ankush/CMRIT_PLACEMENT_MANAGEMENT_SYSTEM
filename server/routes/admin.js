import express from 'express';
import higherOrderMiddleware from '../middleware/highermw.js';
import checkRole from '../middleware/checkrole.js';
import {verifyToken} from '../middleware/auth.js'
import teacher from '../models/teacher.js';
const router = express.Router();

router.get("/api/user/admin",higherOrderMiddleware(verifyToken,checkRole),  async (req, res) => {
  try {
    const userID=req.user.id
    // console.log("user is :-",userID)
    const user=await teacher.findOne({ _id: userID })
    // console.log(user.email)
    return res.status(200).json({valid:true,email:user.email})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ valid: false, message: "Internal Server Error" });
  }
});

export default router;