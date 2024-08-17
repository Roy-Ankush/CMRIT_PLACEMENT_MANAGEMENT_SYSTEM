import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { io } from 'socket.io-client';

function Student() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [email, setEmail] = useState('');

  const tabs = [
    { path: "student/recentactivity", label: "Recent Activity" },
    { path: "student/placementform", label: "Placement Form" },
    { path: "student/tyl", label: "Tyl" },
  ];

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/user/student');
        if (res.data.valid) {
          const fetchedEmail = res.data.email;
          setEmail(fetchedEmail);

          // Establish a socket connection and send the email
          const socket = io('http://localhost:8000');
          socket.on('connect', () => {
            socket.emit('storeEmail', { email: fetchedEmail });
          });

        } else {
          navigate('/');
        }
      } catch (err) {
        console.log(err);
        navigate('/');
      }
    };
    verifyUser();
  }, [navigate]);

  return (
    <>
      <Navbar tabs={tabs} email={email} />
      <Outlet />
    </>
  );
}

export default Student;
