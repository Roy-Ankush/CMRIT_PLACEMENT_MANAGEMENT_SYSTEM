import User_role from '../models/role.js';
import student from '../models/student.js'
import teacher from '../models/teacher.js';

const checkRole = async (req, res, next) => {
  const userid = req.user.id;
  console.log(userid)
  const is_student = await student.findById(userid);
  const is_teacher = await teacher.findById(userid);

  console.log(is_student)
  try {
    if (is_student) {
      const email = is_student.email
      console.log("email is", email)
      const user = await User_role.findOne({ email });
      if(user){
        console.log("user exist in user_db")
        next()
      }else{
        console.log("user not exist in userdb")
        res.status(403).json({ error: 'Unauthorized' });
      }
      console.log("student")
    } else {
      const email = is_teacher.email
      const user = await User_role.findOne({ email });
      if(user){
        console.log("user exist in user_db")
        next()
      }else{
        console.log("user not exist in userdb")
        res.status(403).json({ error: 'Unauthorized' });
      }
      console.log("teacher")
    }
  } catch (error) {
    console.log("pass4")
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
  }
  






  // console.log("useremail is",req.user.email)
  //   console.log("user email is:-",email)

  //   try {
  //     const user = await User_role.findOne({email});
  //     if (user) {
  //       console.log("the given email exist in role db")
  //       next();
  //     } else {
  //       console.log("email not exist in role db")
  //       res.status(403).json({ error: 'Unauthorized' });
  //     }
  //   } catch (error) {
  //     console.log("pass4")
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
};

export default checkRole;