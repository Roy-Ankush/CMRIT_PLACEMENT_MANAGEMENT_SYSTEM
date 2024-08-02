import User_role from '../models/role.js';

const checkRole = async (req, res, next) => {
  console.log('Checking role for user:', req.user);
  const { role } = req.user; // Assuming user object is attached to req.user in authentication middleware

  if (role === 'student') {
    console.log("pass1")
    return next();
  }

  try {
    console.log(req.user.email)
    const user = await User_role.findOne({ email: req.user.email});
    console.log("user are the:",user)
    if (user) {
        console.log("pass2")
      next();
    } else {
        console.log("pass3")
      res.status(403).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.log("pass4")
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default checkRole;
