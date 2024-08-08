import React from 'react';
import Navbar from '../../components/Navbar';
// import MainLayout from './Mainlayout'; // Adjust the path according to your folder structure
import { Outlet } from 'react-router-dom';

const tabs = [
  { path: "placementtrainer/update_mark", label: "Update Mark" },
    { path: "placementtrainer/chat", label: "Chat" },
    
  ];

export default function Trainer() {
  return (
    <>
      <Navbar tabs={tabs} />
      <Outlet/>
    </>
  );
}