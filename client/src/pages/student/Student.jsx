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
          email = res.data.email;
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
       <Navbar tabs={tabs} email={email} />
      <Outlet/>
    </>
  )
}

export default Student