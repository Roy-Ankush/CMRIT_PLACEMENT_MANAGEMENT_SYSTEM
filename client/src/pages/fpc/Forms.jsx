import React from 'react'
import './css/FPC.css'
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const Forms = () => {
  let navigate = useNavigate();

    const handleClick = () => {
      navigate('studentlist');
  };
  return (
    <>
      <div class={`card dept-card form-card`}>
        <div class={`card-body dept-card-body`}>
        <h5>VALIDATE KNOW YOUR CANDIDATE(KYC)</h5>
        <button onClick={handleClick} className={`btn btn-light validate-btn`}>Validate  &nbsp;<FaArrowRightLong /></button>
        </div>  
      </div>
      <div class={`card dept-card form-card`}>
        <div class={`card-body dept-card-body`}>
        <h5>VALIDATE STUDENT PLACEMENT FORM(SPF)</h5>
        <button onClick={handleClick} className={`btn btn-light validate-btn`}>Validate  &nbsp;<FaArrowRightLong /></button>
        </div>  
      </div>
    </>
  )
}

export default Forms
