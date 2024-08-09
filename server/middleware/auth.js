import jwt from  "jsonwebtoken"
import cookieParser from "cookie-parser";
import express from "express";


const app = express();
app.use(cookieParser());

// Generate Token
const generateToken = (userData) => {
    const secret = process.env.JWT_SECRET;
    return jwt.sign(userData, secret);
  };
  


  // Set Token in Cookies
const setAccessTokenCookie = (res, token) => {
    res.cookie('accesstoken', token, {
      httpOnly: true, // Ensures the cookie is only accessible by the web server
      secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent over HTTPS in production
      maxAge: 60000, // 1 minute in milliseconds
    });
  };

  const setRefreshTokenCookie = (res, token) => {
    res.cookie('refreshtoken', token, {
      httpOnly: true, // Ensures the cookie is only accessible by the web server
      secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent over HTTPS in production
      maxAge: 3600000, // 1 hour in milliseconds
    });
  };



 // Middleware to verify and renew token
const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.accesstoken;
  const refreshToken = req.cookies.refreshtoken;

  if (!accessToken) {
    return handleRefreshToken(req, res, next, refreshToken);
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return handleRefreshToken(req, res, next, refreshToken);
  }
};


// Helper function to handle refresh token
const handleRefreshToken = (req, res, next, refreshToken) => {
  if (!refreshToken) {
    return res.status(401).json({ valid: false, message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const newAccessToken = generateToken({ id: decoded.id ,email: decoded.email});
    setAccessTokenCookie(res, newAccessToken);
    req.user = { id: decoded.id , email: decoded.email }; // Attach the decoded user ID to req.user
    next();
  } catch (err) {
    return res.status(401).json({ valid: false, message: 'Invalid Refresh Tokensssss' });
  }
};
  

  export { generateToken,setAccessTokenCookie,setRefreshTokenCookie,verifyToken };