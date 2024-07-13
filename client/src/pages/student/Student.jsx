import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'

function Student() {
  const navigate=useNavigate();
  axios.defaults.withCredentials=true;
  useEffect(()=>{
    axios.get('http://localhost:8000/api/user/student')
    .then(res=>{
      if(res.data.valid){
        console.log("yes verified")
        console.log("then blobk of student page")
        console.log(res)
      }else{
        navigate('/')
      }
    })
    .catch((err)=>{
   console.log("inside student page of catch block")
   console.log(err)
    })
  }, [])
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default Student
