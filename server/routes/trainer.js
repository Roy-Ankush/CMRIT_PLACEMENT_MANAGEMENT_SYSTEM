import express from 'express'
const router=express.Router()


router.get("/api/user/trainer", async (req, res) => {
    try {
        return res.status(200).json({valid:true})
    } catch (error) {
        console.log(error)
    }
  });
  
  export default router;