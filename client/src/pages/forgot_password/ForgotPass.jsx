import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from '../register/Register.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPass() {

  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("before");
        const res = await axios.post('http://localhost:8000/api/user/forgotPassword', { email});
        if (res.status===200) { 
              navigate('/login')
          }
        }
     catch (error) {
        console.log(error.response.status);
        console.log(error)
    }
};
    return (
        <div className={styles.mainContainer}>
            <div className={styles.loginForm}>
                <form onSubmit={handleSubmit}>
                    <h1 className={styles.loginLogo}>Forgot Password</h1>
                    <div className={styles.details}>
                        <span className={styles.var}>useremail</span>
                        <input
                            type="email"
                            name="email"
                            className={styles.userField}
                            onChange={(e) => setEmail(e.target.value)} required
                        />
                    </div>
                    <button type="submit" className={styles.btn}>
                        Send Link
                    </button>     
                </form>
            </div>
        </div>
    )
}

export default ForgotPass
