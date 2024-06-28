import express from 'express'
import router from './login';
import session from 'express-session'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import dotenv from 'dotenv'
dotenv.config();
const router=express.Router();

const clientid=process.env.CLIENT_ID;
const clientsecret=process.env.CLIENT_SECRET;

router.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    
  }))
  router.use(passport.initialize())
  router.use(passport.session());
  passport.use(
    new GoogleStrategy({
      clientID:clientid,
      clientSecret:clientsecret,
      callbackURL:"/auth/google/callback",
      scope:["profile","email"]
    },
    async (accessToken,renewToken,profile,done)=>{
      console.log("profile",profile)
      try {
         let user=await student.findOne({googleId:profile.id});
         if(!user){
          user=new student({
            googleId:profile.id,
            displayName:profile.displayName,
            email:profile.emails[0].value,
            image:profile.photos[0].value
          })
          await user.save()
         }
         return done(null,user);
      } catch (error) {
        return done(error,null);
      }
    }
  )
  )
  
  passport.serializeUser((user,done)=>{
    done(null,user);
  })
  passport.deserializeUser((user,done)=>{
    done(null,user)
  })
  
  router.get('/auth/google',passport.authenticate("google",{scope:["profile","email"]}));
  
  
  router.get("/auth/google/callback", (req, res, next) => {
    passport.authenticate("google", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        // Handle authentication failure
        return res.redirect("http://localhost:5173/login");
      }
      // Manually log in the user and redirect as needed
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("http://localhost:5173/"); // need to add router 
      });
    })(req, res, next);
  });
  
  export default router;