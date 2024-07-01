import jwt from 'jsonwebtoken';
import { renewToken } from './renewToken.js';

export const verifyUser = (req, res, next) => {
  const accesstoken = req.cookies.accessToken;
  if (!accesstoken) {
    if (renewToken(req, res)) {
      next();
    }
  } else {
    jwt.verify(accesstoken, 'jwt-access-token-secret-key', (err, decoded) => {
      if (err) {
        return res.json({ valid: false, message: "Invalid Token" });
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};
