import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Student() {
  const navigate = useNavigate()
    const [message ,setmessage]=useState("");
    axios.defaults.withCredentials=true
    useEffect(() => {
      axios.get('http://localhost:8000/student')
      .then(res => {
          console.log(res)
          if(res.data.valid) {
              setmessage(res.data.message)
          } else {
              navigate('/')
          }
      })
      .catch(err => console.log(err))
  })
  return (
    <>
      <h1>I am a student</h1>
    </>
  )
}

export default Student
