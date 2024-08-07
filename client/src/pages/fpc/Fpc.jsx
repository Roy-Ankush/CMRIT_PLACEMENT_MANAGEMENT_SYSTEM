import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Set axios defaults globally
axios.defaults.withCredentials = true;

function Fpc() {
  // const [isValid, setIsValid] = useState(false);
  // const navigate = useNavigate();

    // Define tabs for Navbar
    const tabs = [
      { path: "fpc/chat", label: "Chats" },
      { path: "fpc/validate", label: "Validate" },
      { path: "fpc/verify", label: "Verify" },
    ];

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     try {
  //       const res = await axios.get('http://localhost:8000/api/user/fpc');
  //       setIsValid(true);
  //       console.log("i am done")
  //       console.log(res)  
  //       navigate('/fpc/chat')
  //     } catch (error) {
  //       console.log("error is",error)
  //       console.log("inside fpc page of catch block");
  //       navigate('/');
  //     }
  //   };

  //   verifyUser();
  // }, [navigate]);

  return (
    <>
      {/* {isValid && ( */}
        <>
           <Navbar tabs={tabs} />
          <Outlet />
        </>
      {/* //  )}  */}
    </>
  );
}

export default Fpc;
