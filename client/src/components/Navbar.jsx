import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { Navigate, NavLink } from "react-router-dom";
import logo from '/cmr_logo.png'; // Import the logo
import { FaUser } from "react-icons/fa";
// import Logout from "../pages/logout/Logout";
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({ tabs, email }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  // console.log("my email is frontend",email)
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  
    const handleLogout=async ()=>{
      try {
        const res = await axios.post('http://localhost:8000/api/user/logout');
        if(res.status==200){
          toast.success('Logout successful!', {
            position: 'top-center',
            autoClose: 2000,
            pauseOnHover: false
          })
          location.reload();
          Navigate('/')
        }
      } catch (error) {
        console.log(error)
      }
    }
    // handleLogout()
 
  

  const handleClickOutside = (event) => {
    if (menuOpen && !event.target.closest("nav")) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
    <nav className={`${styles.nav} w-screen`}>
      <div className={styles.left}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <div className={styles.menu} onClick={handleMenuToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`${styles.navMenu} ${menuOpen ? styles.open : ""}`}>
          {tabs.map((tab) => (
            <li key={tab.path} className={styles.navMenuItem}>
              <NavLink
                to={`/${tab.path}`}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => isActive ? `${styles.navMenuLink} ${styles.active}` : styles.navMenuLink}
              >
                {tab.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <NavLink onClick={togglePopup}>
        <div className="flex-col justify-center items-center mr-5 p-2 cursor-pointer">
          <FaUser className="flex h-7 w-32 bg-[#0f172a] rounded-full items-center" style={{ color: 'white' }} />
          <span className="text-white no-underline">{email}</span>
        </div>
      </NavLink>
      {isOpen && (
        <div className="absolute right-0 mt-44 w-32 mr-7 bg-gray-500 rounded-lg shadow-lg z-10">
          <ul className="mt-2">
            <button className="p-1 hover:text-xl rounded-md cursor-pointer font-bold text-black">
              Profile
            </button>
            <button className="p-1 hover:text-xl rounded-md cursor-pointer font-bold text-black" onClick={handleLogout}>
              Logout
            </button>
          </ul>
        </div>
      )}
    </nav>
    
    </>
  );
};

export default Navbar;