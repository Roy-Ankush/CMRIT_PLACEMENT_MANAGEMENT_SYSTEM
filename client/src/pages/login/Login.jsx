import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import '../register/Register.css'

const Registration = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  // const [confirm_password, setconfirm_password] = useState()
  const navigate = useNavigate()
  
  axios.defaults.withCredentials=true
  const handleSubmit = async(e) => {
    e.preventDefault()
      
    console.log("i am iust below login axios")
    console.log("before student route route")
          axios.post('http://localhost:8000/login', {email, password})
          .then(res => {
            console.log(res)
            if(res.data.Login) {
                navigate("/student")
            } else {
                navigate('/')
            }
        })
        .catch(err => console.log(err))
      
     
      
  }
  return (
    <div className="main-container">
    <div className="login-form">
        <form onSubmit={handleSubmit}>
            <h1 className="login-logo">Login</h1>
            <div className="details">
                <span className="var">useremail</span>
                <input type="email" name="email" className="userfield"  onChange={(e) => setEmail(e.target.value)} required/>
                <i className="fa-solid fa-envelope"></i>
            </div>
                <div className="details">
                <span className="var">password</span>
                <input type="password" name="password" id="passwordField"  onChange={(e) => setPassword(e.target.value)} required/>
                <i className="fa-solid fa-lock" id="togglePassword"></i>
            </div>

            <div className="rem-forgot">
                <label><input type="checkbox" className="cb"/>  Remember me</label>
                <a href="#">Forgot password</a>
            </div>
            <button type="submit" className="btn">Login</button>
            
            <div className="morelogin">
                {/* <!-- <hr> --> */}
                <p className="more-login">or login using</p>
                {/* <!-- <hr> --> */}
            </div>
            <div className="moreoption">
                <button type="submit" className="btn">  <i className="fa-brands fa-google"></i> Login using Google</button>
               
                {/* <!-- <i className="fa-brands fa-instagram"></i> -->
                <!-- <i className="fa-brands fa-linkedin"></i> -->
                <!-- <i className="fa-brands fa-github"></i> --> */}
             </div>

            <div className="register-link">
                <p>Don"t have account?<NavLink to="/register"> register</NavLink></p>
            </div>
        </form>
    </div>
   </div>
  )
}

export default Registration