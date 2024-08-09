import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'

function Student() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [email, setEmail] = useState('');
  
  // Define tabs for Navbar
  const tabs = [
    { path: "student/recentactivity", label: "Recent Activity" },
    { path: "student/placementform", label: "Placement Form" },
    { path: "student/tyl", label: "Tyl" },
  ];


  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/user/student');
        // I am returing valid true as a json object from server
        // if(res.status==200){
        let email;
        if (res.data.valid) {
<<<<<<< HEAD
          email=res.data.email
          console.log("email is ===",email)
          console.log("yes verified");
=======
          email = res.data.email;
>>>>>>> a40b8357c1bdcb553191cad56786e0b709bbe367
          setEmail(email);
        } else {
          navigate('/');
        }
      } catch (err) {
        console.log(err);
        navigate('/')
      }
    };
    verifyUser();
  }, [navigate])
  return (
    <>
<<<<<<< HEAD
      <Navbar tabs={tabs} email={email}/>
=======
       <Navbar tabs={tabs} email={email} />
>>>>>>> a40b8357c1bdcb553191cad56786e0b709bbe367
      <Outlet/>
    </>
  )
}

export default Student