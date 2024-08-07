import express from 'express'
import  {verifyUser}  from '../middleware/verifyUser.js'
const router=express.Router()


router.get("/api/user/trainer",verifyUser, async (req, res) => {
    try {
        return res.status(200).json({valid:true})
    } catch (error) {
        console.log(error)
    }
  });
  
  export default router;