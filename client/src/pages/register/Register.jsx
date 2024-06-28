import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
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
      await axios.post('http://localhost:8000/api/user/register', { email, password, confirm_password });
      console.log('I am just below register axios');
      console.log('before login route');
      navigate('/login');
    } catch (error) {
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
            <span className={styles.var}>useremail</span>
            <input
              type="email"
              name="email"
              className={styles.userField}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className={`fa-solid fa-user ${styles.faUser}`}></i>
          </div>
          <div className={styles.details}>
            <span className={styles.var}>password</span>
            <input
              type="password"
              name="password"
              id="passwordField"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className={`fa-solid fa-lock ${styles.faLock}`} id="togglePassword"></i>
          </div>
          <div className={styles.details}>
            <span className={styles.var}>confirm password</span>
            <input
              type="password"
              name="confirm_password"
              id="passwordField2"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <i className={`fa-solid fa-lock ${styles.faLock}`} id="togglePassword2"></i>
          </div>
          <div className={styles.remForgot}>
            <label>
              <input type="checkbox" className={styles.cb} /> Remember me
            </label>
          </div>
          <button type="submit" className={styles.btn} value="register">
            Register
          </button>
          <div className={styles.moreLogin}>
            <p className={styles.moreLoginText}>or register using</p>
          </div>
          <div className={styles.moreOption}>
            <button type="button" className={styles.btn} onClick={loginWithGoogle} value="register">
              <i className="fa-brands fa-google"></i> Login using google
            </button>
          </div>
          <div className={styles.registerLink}>
            <p>
              Already have an account? <NavLink to="/login">login</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
