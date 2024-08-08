import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Set axios defaults globally
axios.defaults.withCredentials = true;

function Fpc() {
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

    // Define tabs for Navbar
    const tabs = [
      { path: "admin/home", label: "Home" },
    ];
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/user/admin');
        if (res.status === 200) {
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
          <Navbar tabs={tabs} />
          <Outlet />
        </>
      )}
    </>
  );
}

export default Fpc;