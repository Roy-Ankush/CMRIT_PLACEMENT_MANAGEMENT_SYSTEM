import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import style from "./Navbar_off.module.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Effect to navigate to the default tab on component mount if no specific sub-route is provided
  useEffect(() => {
    if (location.pathname === '/officer' || location.pathname === '/officer/') {
      navigate(`/officer/${selectedTab}`, { replace: true });
    }
  }, [navigate, location.pathname, selectedTab]);

  // Function to handle tab selection
  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
    navigate(`/officer/${tabName}`);
  };

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle clicking outside the dropdown to close it
  const handleClickOutside = (event) => {
    if (isDropdownOpen && !event.target.closest(`.${style.profile}`)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <div className={style.body}>
        <div className={style.companyLogo}>
          <img src="/cmr_logo.png" alt="Company Logo" className={style.logo} />
        </div>
        <div className={style.leftContent}>
          <ul className={style.tabs}>
            <li>
              <NavLink
                to="home"
                className={style.navlink}
                onClick={() => handleTabChange("home")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="drives"
                className={style.navlink}
                onClick={() => handleTabChange("drives")}
              >
                Drives
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={style.profile} onClick={toggleDropdown}>
          <div className={style.profileInfo}>
            <span className={style.username}> </span>
          </div>
          <img src="/profile.png" alt="" className={style.profilelogo} />
          {isDropdownOpen && (
            <div className={style.dropdown_menu}>
              <NavLink to="/profile" className={style.dropdown_item}>
                Profile
              </NavLink>
              <NavLink to="/logout" className={style.dropdown_item}>
                Logout
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
