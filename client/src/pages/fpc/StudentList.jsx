import React from 'react'
import { Link } from 'react-router-dom';
import './css/FPC.css'
// import { FaArrowRightLong } from "react-icons/fa6";

const cardData = [
  { id: 1, title: 'Anushka Tiwari', usn: '1CR21IS026' },
  { id: 2, title: 'Anushka Tiwari', usn: '1CR21IS026' },
  { id: 3, title: 'Anushka Tiwari', usn: '1CR21IS026' },
  // Add more card data as needed
];

// Main Card component
const StudentList = () => {
  return (
    <div>
      {cardData.map(card => (
        <div key={card.id} className={`card dept-card form-card`}>
          <div className={`card-body dept-card-body`}>
            <Link to="kycdata">
              <h5 className={`card-title`}>{card.title}</h5>
            </Link>
          </div>
          <div className={`card-footer`}>
            {card.usn}
          </div>
        </div>
      ))}
    </div>
  );
};


export default StudentList
