import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'

function Student() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  
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
        if (res.data.valid) {
          console.log("yes verified");
          console.log("then block of student page");
          console.log(res);
        } else {
          navigate('/');
        }
      } catch (err) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.header)
        console.log("inside student page of catch block");
        console.log(err);
        navigate('/')
      }
    };
    verifyUser();
  }, [navigate])
  return (
    <>
      <Navbar tabs={tabs} />
      <Outlet/>
    </>
  )
}

export default Student