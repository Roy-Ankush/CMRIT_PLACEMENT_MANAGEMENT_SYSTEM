// import jwt from 'jsonwebtoken';
// import { renewToken } from './renewToken.js';

// export const verifyUser = (req, res, next) => {
//   const accesstoken = req.cookies.accessToken;
//   if (!accesstoken) {
//     if (renewToken(req, res)) {
//       next();
//     }
//   } else {
//     jwt.verify(accesstoken, 'jwt-access-token-secret-key', (err, decoded) => {
//       if (err) {
//         return res.json({ valid: false, message: "Invalid Token" });
//       } else {
//         req.email = decoded.email;
//         next();
//       }
//     });
//   }
// };

// verifyUser.js
import jwt from 'jsonwebtoken';
import { renewToken } from './renewToken.js';

export const verifyUser = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    if (renewToken(req, res)) {
      next();
    } else {
      return res.status(401).json({ valid: false, message: "Unauthorized" });
    }
  } else {
    jwt.verify(accessToken, 'jwt-access-token-secret-key', (err, decoded) => {
      if (err) {
        return res.json({ valid: false, message: "Invalid Token" });
      } else {
        req.email = decoded.email
        req.user = decoded; // Attach the decoded user information to req.user
        console.log('User verified:', req.user);
        next();
      }
    });
  }
};


