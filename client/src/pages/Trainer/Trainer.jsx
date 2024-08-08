  import React, { useEffect, useState } from 'react';
  import Navbar from '../../components/Navbar';
  import { Outlet, useNavigate } from 'react-router-dom';
  import axios from 'axios';
  
  // Set axios defaults globally
  axios.defaults.withCredentials = true;
  
  function Fpc() {
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();
  
      
  const tabs = [
  { path: "placementtrainer/update_mark", label: "Update Mark" },
    { path: "placementtrainer/chat", label: "Chat" },
    
    ];
    useEffect(() => {
      const verifyUser = async () => {
        try {
          const res = await axios.get('http://localhost:8000/api/user/placementtrainer');
          if (res.status === 200) {
            setIsValid(true);
            navigate('/placementtrainer/update_mark');
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