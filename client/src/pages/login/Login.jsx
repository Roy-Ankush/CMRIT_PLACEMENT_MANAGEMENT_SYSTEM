import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from '../register/Register.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  // const loginWithGoogle = () => {
  //   window.open('http://localhost:8000/auth/google/callback', '_self');
  // };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();
  

  axios.defaults.withCredentials = true;  //This ensures cookies are sent with the request
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("before");
        const res = await axios.post('http://localhost:8000/api/user/login', { email, password,role});
        const fetchrole = res.data.roles;
        // console.log("the role is",role)
        // console.log("the role fetched is",fetchrole)
        if (res.status===200) { 
          if(fetchrole==='spc' && role==='spc'){
            navigate('/spc');
            toast.success('SPC Login successful!', {
              position: 'top-center',
              autoClose: 2000,
              pauseOnHover: false
            })
          }else if(fetchrole==='fpc' && role==='fpc'){
            // matych role input from fntend and bkend and role also to ..............
            navigate('/fpc')
            toast.success('FPC Login successful!', {
              position: 'top-center',
              autoClose: 2000,
              pauseOnHover: false
            })
          }else if(fetchrole==='student' && role==='student'){
            navigate('/student');
            toast.success('Student Login successful!', {
              position: 'top-center',
              autoClose: 2000,
              pauseOnHover: false
            })
          }
          else if(fetchrole==='admin'){ // need to think on it
            if(role=="student"){
              navigate('/student');
              toast.success('Student Login successful!', {
                position: 'top-center',
                autoClose: 2000,
                pauseOnHover: false
              })
            }else if(role==="fpc"){
              navigate('/fpc');
              toast.success('Fpc Login successful!', {
                position: 'top-center',
                autoClose: 2000,
                pauseOnHover: false
              })
            }else if(role==="spc"){
              navigate('/fpc');
              toast.success('Spc Login successful!', {
                position: 'top-center',
                autoClose: 2000,
                pauseOnHover: false
              })
            }else if(role==="placementtrainer"){
              navigate('/placementtrainer');
              toast.success('PlacementTrainer Login successful!', {
                position: 'top-center',
                autoClose: 2000,
                pauseOnHover: false
              })
            }else if(role==="placementofficer"){
              navigate('/officer');
              toast.success('PlacementOfficer Login successful!', {
                position: 'top-center',
                autoClose: 2000,
                pauseOnHover: false
              })
            }
          }else if(fetchrole==='placementtrainer' && role==='placementtrainer'){
            navigate('/placementtrainer');
            toast.success('Placemenetrainer Login successful!', {
              position: 'top-center',
              autoClose: 2000,
              pauseOnHover: false
            })
          }else if(fetchrole==='placementofficer' && role==='placementofficer'){
            navigate('/officer');
            toast.success('Placementofficer Login successful!', {
              position: 'top-center',
              autoClose: 2000,
              pauseOnHover: false
            })
          }else{
            navigate('/login')
            toast.error('Inavlid Role!', {
              position: 'top-center',
              autoClose: 2000,
              pauseOnHover: false
            })
          }
        }
    } catch (error) {
        if(error.response.status===422){
          toast.error('Inavlid Role!', {
            position: 'top-center',
            autoClose: 2000,
            pauseOnHover: false
          })
        navigate('/login');
        }else if(error.response.status===404){
          toast.error('Invaldi email format!', {
            position: 'top-center',
            autoClose: 2000,
            pauseOnHover: false
          })
          navigate('/login')
        }else if(error.response.status===400){
          toast.error('Invalid password!', {
            position: 'top-center',
            autoClose: 2000,
            pauseOnHover: false
          })
          navigate('/login')
        }else if(error.response.status===404){
          toast.error('User not Exist Please register!', {
            position: 'top-center',
            autoClose: 2000,
            pauseOnHover: false
          })
          navigate('/register')
        }
    }
};

  return (
    <>
   
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
              onChange={(e) => setEmail(e.target.value)} required
            />
            {/* <i className={`fa-solid fa-envelope ${styles.faEnvelope}`}></i> */}
          </div>
          <div className={styles.details}>
            <span className={styles.var}>password</span>
            <input
              type="password"
              name="password"
              id="passwordField"
              onChange={(e) => setPassword(e.target.value)}required
            />
            {/* <i className={`fa-solid fa-lock ${styles.faLock}`} id="togglePassword"></i> */}
          </div>
          <div className={styles.details}>
                        <span className={styles.var}>role</span>
                        <select
                            name="role"
                            className={styles.userField}
                            onChange={(e) => setRole(e.target.value)}
                            value={role} required
                        >
                            <option value="student">student</option>
                            <option value="spc">spc</option>
                            <option value="fpc">fpc</option>
                            <option value="placementtrainer">Plcement Trainer</option>
                            <option value="placementofficer">Placement Officer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
          <div className={styles.remForgot}>
            <label>
              <input type="checkbox" className={styles.cb} /> Remember me
            </label>
            {/* <a href="#">Forgot password</a> */}
            <NavLink to="/forgotPassword"> <u>Forgot password</u></NavLink>
          </div>
          <button type="submit" className={styles.btn}>
            Login
          </button>
          {/* <div className={styles.moreLogin}>
            <p className={styles.moreLoginText}>or login using</p>
          </div> */}
          {/* <div className={styles.moreOption}>
            <button type="button" onClick={loginWithGoogle} className={styles.btn}>
              <i className="fa-brands fa-google"></i> Login using Google
            </button>
          </div> */}
          <div className={styles.registerLink}>
            <p>
              Don"t have account? <NavLink to="/register">register</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
