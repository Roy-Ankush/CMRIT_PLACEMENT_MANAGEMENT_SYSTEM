import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import styles from '../register/Register.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {
    const {id,token}=useParams();
    const [password, setPassword] = useState('');
    const [confirm_password, setconfirm_Password] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("reset password");
            const res = await axios.post(`http://localhost:8000/api/user/resetPassword/${id}/${token}`, { password , confirm_password});
            if (res.status === 200) {
                navigate('/login')
            }
        }
        catch (error) {
            console.log(error.response.status);
            console.log(error)
            navigate("/register")
        }
    };
    return (
        <div className={styles.mainContainer}>
            <div className={styles.loginForm}>
                <form onSubmit={handleSubmit}>
                    <h1 className={styles.loginLogo}>Forgot Password</h1>
                    <div className={styles.details}>
                        <span className={styles.var}>new password</span>
                        <input
                            type="password"
                            name="password"
                            id="passwordField"
                            onChange={(e) => setPassword(e.target.value)} required
                        />
                    </div>
                    <div className={styles.details}>
                        <span className={styles.var}>confirm password</span>
                        <input
                            type="password"
                            name="confirm_password"
                            id="passwordField"
                            onChange={(e) => setconfirm_Password(e.target.value)} required
                        />
                    </div>
                    <button type="submit" className={styles.btn}>
                        Update password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword;
