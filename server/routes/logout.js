import express from 'express';


const router = express.Router();

router.post("/api/user/logout",  async (req, res) => {
    // console.log("sdfhvsdhufvsh54455445454554545")
    res.cookie('accesstoken', '', { 
        expires: new Date(0), // Set the cookie to expire immediately
        httpOnly: true, // Ensure it's a server-side cookie
        secure: true, // Ensure the cookie is sent over HTTPS (optional, depending on your setup)
        sameSite: 'Strict', // Adjust according to your needs
        path: '/' // Make sure the path matches the one used when the cookie was set
      });
    //   console.log("accrestoken is:----")
      res.cookie('refreshtoken', '', { 
        expires: new Date(0), 
        httpOnly: true, 
        secure: true, 
        sameSite: 'Strict',
        path: '/' 
      });
    
      res.status(200).json({message:'Logout successful'});
});

export default router;