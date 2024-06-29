import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from '../register/Register.module.css';

const Login = () => {
  const loginWithGoogle = () => {
    window.open('http://localhost:8000/auth/google/callback', '_self');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("before");
        const res = await axios.post('http://localhost:8000/api/user/login', { email, password,role });
        

        console.log(res.status)
        if (res.status===200) { // ankit u need to add route based upon role here only don't disturb catch part
          if(role==='student'){
            navigate('/student');
          }else if(role==='fpc'){
            navigate('/fpc')
          }
          
        }
    } catch (error) {
        if(error.response.status===400){
        navigate('/login');
        }else{
          // console.log(error.response.status) 404 getting on invalid email
          navigate('/register')
        }
    }
};

  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginForm}>
        <form onSubmit={handleSubmit}>
          <h1 className={styles.loginLogo}>Login</h1>
          <div className={styles.details}>
            <span className={styles.var}>useremail</span>
            <input
              type="email"
              name="email"
              className={styles.userField}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className={`fa-solid fa-envelope ${styles.faEnvelope}`}></i>
          </div>
          <div className={styles.details}>
            <span className={styles.var}>password</span>
            <input
              type="password"
              name="password"
              id="passwordField"
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className={`fa-solid fa-lock ${styles.faLock}`} id="togglePassword"></i>
          </div>
          <div className={styles.details}>
                        <span className={styles.var}>role</span>
                        <select
                            name="role"
                            className={styles.userField}
                            onChange={(e) => setRole(e.target.value)}
                            value={role}
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="spc">SPC</option>
                            <option value="fpc">FPC</option>
                            <option value="tyl">TYL</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
          <div className={styles.remForgot}>
            <label>
              <input type="checkbox" className={styles.cb} /> Remember me
            </label>
            <a href="#">Forgot password</a>
          </div>
          <button type="submit" className={styles.btn}>
            Login
          </button>
          <div className={styles.moreLogin}>
            <p className={styles.moreLoginText}>or login using</p>
          </div>
          <div className={styles.moreOption}>
            <button type="button" onClick={loginWithGoogle} className={styles.btn}>
              <i className="fa-brands fa-google"></i> Login using Google
            </button>
          </div>
          <div className={styles.registerLink}>
            <p>
              Don"t have account? <NavLink to="/register">register</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
