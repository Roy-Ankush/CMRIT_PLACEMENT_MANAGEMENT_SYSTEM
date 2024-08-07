import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import logo from '/cmr_logo.png'; // Import the logo

const Navbar = ({ tabs }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

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
  }, [menuOpen]);

  return (
    <nav className={styles.nav}>
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
      <NavLink  
        className={({ isActive }) => isActive ? `${styles.profile} ${styles.active}` : styles.profile}
      >
        Profile
      </NavLink>
    </nav>
  );
};

export default Navbar;
