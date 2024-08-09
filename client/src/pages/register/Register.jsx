import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Register.module.css';

const Registration = () => {
  const loginWithGoogle = () => {
    window.open('http://localhost:8000/auth/google/callback', '_self');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const x= await axios.post('http://localhost:8000/api/user/register', { email,password });
      navigate('/login')
      toast.success('Register successful!', {
        position: 'top-center',
        autoClose: 2000,
        pauseOnHover: false
      })
    } catch (error) {
      console.log(error.response.status)
      if(error.response.status===409){
        toast.error('Email already exist in database!', {
          position: 'top-center',
          autoClose: 2000,
          pauseOnHover: false
        })
      }
     else if(error.response.status===422){
        toast.error('Invalid Email format!', {
          position: 'top-center',
          autoClose: 2000,
          pauseOnHover: false
        })
      }
      else if(error.response.status===401){
        toast.error('Invalid Confirm_password!', {
          position: 'top-center',
          autoClose: 2000,
          pauseOnHover: false
        })
      }else{
        toast.error('Server Error!', {
          position: 'top-center',
          autoClose: 2000,
          pauseOnHover: false
        })
      }
      navigate('/register');
      console.log('Some error happens in register file');
      console.log(error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginForm}>
        <form onSubmit={handleSubmit}>
          <h1 className={styles.loginLogo}>Register</h1>
          <div className={styles.details}>
            <span className={styles.var}>Email</span>
            <input
              type="email"
              name="email"
              className={styles.userField}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* <i className={`fa-solid fa-user ${styles.faUser}`}></i> */}
          </div>
          <div className={styles.details}>
            <span className={styles.var}>Confirm password</span>
            <input
              type="password"
              name="password"
              id="passwordField"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className={`fa-solid fa-lock ${styles.faLock}`} id="togglePassword"></i>
          </div>
          {/* <div className={styles.details}>
            <span className={styles.var}>confirm password</span>
            <input
              type="password"
              name="confirm_password"
              id="passwordField2"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div> */}
          {/* <div className={styles.remForgot}>
            <label>
              <input type="checkbox" className={styles.cb} /> Remember me
            </label>
          </div> */}
          <button type="submit" className={styles.btn} value="register">
            Register
          </button>
          {/* <div className={styles.moreLogin}>
            <p className={styles.moreLoginText}>or register using</p>
          </div> */}
          {/* <div className={styles.moreOption}>
            <button type="button" className={styles.btn} onClick={loginWithGoogle} value="register">
              <i className="fa-brands fa-google"></i> Login using google
            </button>
          </div> */}
          <div className={styles.registerLink}>
            <p>
              Already have an account? <NavLink to="/login">Login</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
