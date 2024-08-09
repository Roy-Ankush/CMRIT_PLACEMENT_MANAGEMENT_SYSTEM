// import React from 'react';
// import {Outlet} from 'react-router-dom';

// const Officer = () => {
//   return (
//     <div>
//       <Outlet/>
//     </div>
//   )
// }

// export default Officer


import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Set axios defaults globally
axios.defaults.withCredentials = true;

function Officer() {
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

    // Define tabs for Navbar
    const tabs = [
      { path: "officer/home", label: "Home" },
      { path: "officer/drives", label: "Drives" },
    ];
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/user/officer');
        let email
        if (res.status === 200) {
          email=res.data.email
          setEmail(email);
          setIsValid(true);
          navigate('/officer/home');
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
<<<<<<< HEAD
          <Navbar tabs={tabs} email={email} />
=======
           <Navbar tabs={tabs} email={email} />
>>>>>>> a40b8357c1bdcb553191cad56786e0b709bbe367
          <Outlet />
        </>
      )}
    </>
  );
}

export default Officer;