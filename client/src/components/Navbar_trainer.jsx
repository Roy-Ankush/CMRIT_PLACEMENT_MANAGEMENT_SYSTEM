import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";

function Navbar_trainer() {
  return (
    <>
      <div className={style.body}>
        <div className={style.companyLogo}>
          <img src="/cmr_logo.png" alt="Company Logo" className={style.logo} />
        </div>
        <div className={style.leftContent}>
          <ul>
            <li>
              <NavLink to="/placementtrainer" className={style.navlink}>Home</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar_trainer;
