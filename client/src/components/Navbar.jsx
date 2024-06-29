import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import style from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("recentactivity");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Effect to navigate to the default tab on component mount
  useEffect(() => {
    navigate(`/student/${selectedTab}`, { replace: true });
  }, [navigate, selectedTab]);

  // Function to handle tab selection
  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
  };

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle clicking outside the dropdown to close it
  const handleClickOutside = (event) => {
    if (isDropdownOpen && !event.target.closest(".profile")) {
      setIsDropdownOpen(false);
    }
  };

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
          to="recentactivity"
          className={style.navlink}
          onClick={() => handleTabChange("recentactivity")}
        >
          Recent Activity
        </NavLink>
      </li>
      <li>
        <NavLink
          to="placementform"
          className={style.navlink}
          onClick={() => handleTabChange("placementform")}
        >
          Placement Form
        </NavLink>
      </li>
      <li>
        <NavLink
          to="tyl"
          className={style.navlink}
          onClick={() => handleTabChange("tyl")}
        >
          Tyl
        </NavLink>
      </li>
    </ul>
  </div>
  <div className={style.profile} onClick={toggleDropdown}>
    <div className={style.profileInfo}>
      <span className={style.username}>Ankit </span>
    </div>
    <img src="/profile.png" alt="" className={style.profilelogo} />
    {isDropdownOpen && (
      <div className={style.dropdown_menu}>
        <Link to="/profile" className={style.dropdown_item}>
          Profile
        </Link>
        <Link to="/logout" className={style.dropdown_item}>
          Logout
        </Link>
      </div>
    )}
  </div>
</div>

    </>
  );
}

export default Navbar;
