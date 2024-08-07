import axios from 'axios';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const Student = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  // Define tabs for Navbar
  const tabs = [
    { path: "student/recentactivity", label: "Recent Activity" },
    { path: "student/placementform", label: "Placement Form" },
    { path: "student/tyl", label: "Tyl" },
  ];

  useEffect(() => {
    axios.get('http://localhost:8000/api/user/student')
      .then(res => {
        if (res.data.valid) {
          console.log("yes verified");
          console.log("then block of student page");
          console.log(res);
        } else {
          navigate('/');
        }
      })
      .catch((err) => {
        console.log("inside student page of catch block");
        console.log(err);
      });
  }, [navigate]);

  return (
    <>
      <Navbar tabs={tabs} />
      <Outlet />
    </>
  );
}

export default Student;
