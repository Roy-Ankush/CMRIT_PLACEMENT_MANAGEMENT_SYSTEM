import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import '../register/Register.css'

const Registration = () => {
    // const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirm_password, setconfirm_password] = useState()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            axios.post('http://localhost:8000/register', {email, password,confirm_password})
            console.log("i am iust below register axios")
            console.log("before login route")
            navigate('/login')
        } catch (error) {
            console.log("some error happens is register file")
            console.log(error)
        }
       
        
    }
  return (
    <div className="main-container">
    <div className="login-form">
        <form onSubmit={handleSubmit}>
            <h1 className="login-logo">Register</h1>
            <div className="details">
                <span className="var">useremail</span>
                <input type="email" name="email" className="userfield" onChange={(e) => setEmail(e.target.value)} required />
                <i className="fa-solid fa-user"></i>
            </div>
            <div className="details">
                <span className="var">password</span>
                <input type="password" name="password" id="passwordField" onChange={(e) => setPassword(e.target.value)} required/>
                <i className="fa-solid fa-lock" id="togglePassword"></i>
            </div>
                <div className="details">
                <span className="var">confirm password</span>
                <input type="password" name="confirm_password" id="passwordField2" onChange={(e) => setconfirm_password(e.target.value)} required/>
                <i className="fa-solid fa-lock" id="togglePassword2"></i>
            </div>
            <div className="rem-forgot">
                <label><input type="checkbox" className="cb"/>  Remember me</label>
                {/* <!-- <a href="#">Forgot password</a> --> */}
            </div>
            <button type="submit" className="btn" value="register">Register</button>
            
            <div className="morelogin">
                {/* <!-- <hr> --> */}
                <p className="more-login">or register using</p>
                {/* <!-- <hr> --> */}
            </div>
            <div className="moreoption">
                <button type="submit" className="btn" value="register"> <i className="fa-brands fa-google"></i> Login using google</button>
               
                {/* <!-- <i className="fa-brands fa-instagram"></i> -->
                <!-- <i className="fa-brands fa-linkedin"></i>
                <i className="fa-brands fa-github"></i> --> */}
             </div>

            <div className="register-link">
                <p>Already have account?<NavLink to="/login"> login</NavLink></p>
            </div>
        </form>
    </div>
   </div>
  )
}

export default Registration