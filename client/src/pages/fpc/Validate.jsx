// import React from 'react'
// import './FPC.css'
// import { FaArrowRightLong } from "react-icons/fa6";
// import { useNavigate } from 'react-router-dom';

// const Validate = () => {
//     let navigate = useNavigate();

//     const handleClick = () => {
//       navigate('/forms');
//     };
//   return (
//     <>
//     <div className='batch-card'>
//     <div className="card dept-card ">
//     <div class="card-body dept-card-body">
//         <h5>CSE'2025</h5>
//         <button onClick={handleClick} className='btn btn-light validate-btn'>Validate  &nbsp;<FaArrowRightLong /></button>
//     </div>
//     </div>
//     <div className="card dept-card">
//     <div className="card-body dept-card-body">
//         <h5>CSE'2026</h5>
//         <button onClick={handleClick} className='btn btn-light validate-btn'>Validate  &nbsp;<FaArrowRightLong /></button>
//     </div>
//     </div>
//     <div className="card dept-card">
//     <div className="card-body dept-card-body">
//         <h5>ISE'2025</h5>
//         <button onClick={handleClick} className='btn btn-light validate-btn'>Validate  &nbsp;<FaArrowRightLong /></button>
//     </div>
//     </div>
//     <div className="card dept-card">
//     <div className="card-body dept-card-body">
//         <h5>ISE'2026</h5>
//         <button onClick={handleClick} className='btn btn-light validate-btn'>Validate  &nbsp;<FaArrowRightLong /></button>
//     </div>
//     </div>
//     <div className="card dept-card">
//     <div className="card-body dept-card-body">
//         <h5>ECE'2025</h5>
//         <button onClick={handleClick} className='btn btn-light validate-btn'>Validate  &nbsp;<FaArrowRightLong /></button>
//     </div>
//     </div>
//     <div className="card dept-card">
//     <div className="card-body dept-card-body">
//         <h5>EEE'2025</h5>
//         <button onClick={handleClick} className='btn btn-light validate-btn'>Validate  &nbsp;<FaArrowRightLong /></button>
//     </div>
//     </div>
//     <div className="card dept-card">
//     <div className="card-body dept-card-body">
//         <h5>AIML'2025</h5>
//         <button onClick={handleClick} className='btn btn-light validate-btn'>Validate  &nbsp;<FaArrowRightLong /></button>
//     </div>
//     </div>
//     <div className="card dept-card">
//     <div className="card-body dept-card-body">
//         <h5>AIML'2026</h5>
//         <button onClick={handleClick} className='btn btn-light validate-btn'>Validate  &nbsp;<FaArrowRightLong /></button>
//     </div>
//     </div>  
//     <div className="card dept-card">
//       <div className="card-body dept-card-body">
//         <h5>AIDS'2025</h5>
//         <button onClick={handleClick} className='btn btn-light validate-btn'>Validate  &nbsp;<FaArrowRightLong /></button>
//       </div>
//     </div>       
//     <div className="card dept-card">
//     <div className="card-body dept-card-body">
//         <h5>AIDS'2026</h5>
//         <button onClick={handleClick} className='btn btn-light validate-btn'>Validate  &nbsp;<FaArrowRightLong /></button>
//     </div>  
//     </div> 
//     <div className="card dept-card">
//     <div className="card-body dept-card-body">
//         <h5>CIV'2025</h5>
//         <button onClick={handleClick} className='btn btn-light validate-btn'>Validate  &nbsp;<FaArrowRightLong /></button>
//     </div>  
//     </div> 
//     <div className="card dept-card">
//     <div className="card-body dept-card-body">
//         <h5>MECH'2025</h5>
//         <button onClick={handleClick} className='btn btn-light validate-btn'>Validate  &nbsp;<FaArrowRightLong /></button>
//     </div>  
//     </div> 
//     </div>        
//     </>
//   )
// }

// export default Validate
import React from 'react';
import './css/FPC.css';
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const DepartmentCard = ({ department, year, onClick }) => (
  <div className={`card dept-card`}>
    <div className={`card-body dept-card-body`}>
      <h5>{`${department}'${year}`}</h5>
      <button onClick={onClick} className={`btn btn-light validate-btn`}>
        Validate &nbsp;<FaArrowRightLong />
      </button>
    </div>
  </div>
);

const Validate = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('forms');
  };

  const departments = [
    { department: 'CSE', year: '2025' },
    { department: 'CSE', year: '2026' },
    { department: 'ISE', year: '2025' },
    { department: 'ISE', year: '2026' },
    { department: 'ECE', year: '2025' },
    { department: 'EEE', year: '2025' },
    { department: 'AIML', year: '2025' },
    { department: 'AIML', year: '2026' },
    { department: 'AIDS', year: '2025' },
    { department: 'AIDS', year: '2026' },
    { department: 'CIV', year: '2025' },
    { department: 'MECH', year: '2025' },
  ];

  return (
    <div className={`batch-card`}>
      {departments.map(({ department, year }) => (
        <DepartmentCard
          key={`${department}-${year}`}
          department={department}
          year={year}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};

export default Validate;

