import jwt from 'jsonwebtoken';

export const renewToken = (req, res) => {
  const refreshtoken = req.cookies.refreshToken;
  let exist = false;
  if (!refreshtoken) {
    return res.json({ valid: false, message: "No Refresh token" });
  } else {
    jwt.verify(refreshtoken, 'jwt-refresh-token-secret-key', (err, decoded) => {
      if (err) {
        return res.json({ valid: false, message: "Invalid Refresh Token" });
      } else {
        const accessToken = jwt.sign({ email: decoded.email }, 
          'jwt-access-token-secret-key', { expiresIn: '1m' });
        res.cookie('accessToken', accessToken, { maxAge: 60000 });
        exist = true;
      }
    });
  }
  return exist;
};
