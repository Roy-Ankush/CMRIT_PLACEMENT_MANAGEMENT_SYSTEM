import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Set axios defaults globally
axios.defaults.withCredentials = true;

function Admin () {
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

    // Define tabs for Navbar
    const tabs = [
      { path: "admin/home", label: "Home" },
      { path: "admin/chat", label: "Chat" },
    ];
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/user/admin');
        let email
        if (res.status === 200) {
          email=res.data.email
          setEmail(email);
          setIsValid(true);
          navigate('/admin/home');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.log("error is",error)
        console.log("inside fpc page of catch block");
       
        navigate('/');
      }
    };
    verifyUser();
  }, []);

  return (
    <>
      {isValid && (
        <>
          <Navbar tabs={tabs} email={email} />
          <Outlet />
        </>
      )}
    </>
  );
}

export default Admin;