import React from 'react';
import Navbar from '../../components/Navbar_trainer';
// import MainLayout from './Mainlayout'; // Adjust the path according to your folder structure
import { Outlet } from 'react-router-dom';

export default function Trainer() {
  return (
    <>
      <Navbar />
      <Outlet/>
    </>
  );
}
