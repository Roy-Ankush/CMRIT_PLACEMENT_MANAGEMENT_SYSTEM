import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
  })
  return (
    <div>
      <h1>successfull login into student route</h1>
    </div>
  )
}

export default Student
