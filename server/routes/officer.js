import express from 'express';
import { verifyUser } from '../middleware/verifyUser.js';
import higherOrderMiddleware from '../middleware/highermw.js';
import checkRole from '../middleware/checkrole.js';

const router = express.Router();

router.get("/api/user/officer", async (req, res) => {
  try {
    return res.status(200).json({ valid: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ valid: false, message: "Internal Server Error" });
  }
});

export default router;
