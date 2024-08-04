// import React from "react";
// import './FPC.css';
// import { IoIosChatboxes } from "react-icons/io";
// import { FaUserCircle } from "react-icons/fa";
// const FPC = () => {
//   return (
//     <>
//       {/* <button type="button" class="btn btn-primary createChat">+ Create Chat</button> */}
//       <div className="row">
//         <div className="col-7 chat-card-container">
//         <div className="chat-card">

//           <div class="card">
//             <div class="card-header">
//                   General
//             </div>
//             <div class="card-body">
//               <p><FaUserCircle className="icon"/> @anti21is</p>
//               <h5 class="card-title">KYC VALIDATION'2025</h5>
//               <p class="card-text">Regarding KYC Validation for 2025 batch.</p>
//               <a href="#" class="btn btn-primary">View</a>
//             </div>
//             <div class="card-footer text-body-secondary">
//               2 days ago
//             </div>
//           </div>
//           <div class="card">
//             <div class="card-header">
//                   Training-Java
//             </div>
//             <div class="card-body">
//             <p><FaUserCircle className="icon"/> @anti21is</p>
//               <h5 class="card-title">P4 JAVA RETEST'2025</h5>
//               <p class="card-text">P4 Java retest has been scheduled on 26th June 2024.</p>
//               <a href="#" class="btn btn-primary">View</a>
//             </div>
//             <div class="card-footer text-body-secondary">
//               2 days ago
//             </div>
//           </div>
//           <div class="card">
//             <div class="card-header">
//                   Training-Python
//             </div>
//             <div class="card-body">
//             <p><FaUserCircle className="icon"/> @anti21is</p>
//               <h5 class="card-title">P4 PYTHON RETEST'2025</h5>
//               <p class="card-text">P4 Python retest has been scheduled on 28th June 2024.</p>
//               <a href="#" class="btn btn-primary">View</a>
//             </div>
//             <div class="card-footer text-body-secondary">
//               2 days ago
//             </div>
//           </div>
//           <div class="card">
//             <div class="card-header">
//                   Training-Python
//             </div>
//             <div class="card-body">
//             <p><FaUserCircle className="icon"/> @anti21is</p>
//               <h5 class="card-title">P4 PYTHON RETEST'2025</h5>
//               <p class="card-text">P4 Python retest has been scheduled on 28th June 2024.</p>
//               <a href="#" class="btn btn-primary">View</a>
//             </div>
//             <div class="card-footer text-body-secondary">
//               2 days ago
//             </div>
//           </div>
//         </div>
//         </div>
//         <div className="col-4 chat-form">
//           <form action="" >
//             <div>
//               <h5><IoIosChatboxes className="icon" /> Create Chat </h5>
//               <hr />
//               <label htmlFor="topic">Topic</label> <br />
//               <select name="topic" className="chat-field">
//                 <option value="">General</option>
//                 <option value="">Training-Aptitude</option>
//                 <option value="">Training-Soft Skills</option>
//                 <option value="">Training-Java</option>
//                 <option value="">Training-Python</option>
//                 <option value="">Training-Core</option>
//               </select><br />
//               <label htmlFor="batch">Batch</label><br />
//               <select name="batch" className="chat-field">
//                 <option value="">----</option>
//                 <option value="">2025</option>
//                 <option value="">2026</option>
//               </select><br />
//               <label htmlFor="name">Name</label><br />
//               <input type="text" name="name" className="chat-field"/><br />
//               <label htmlFor="description">Description</label><br />
//               <textarea name="description" id="description" rows={4}></textarea><br />
//               <button type="button" class="btn btn-primary">Create</button>
//               <button type="button" class="btn btn-light">Cancel</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FPC;

// FPC.js
import React from "react";
import { Link, NavLink, Outlet } from 'react-router-dom';
import './css/FPC.css';
import { IoIosChatboxes } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
const FPC = () => {
  const chats = [
    { id: 1, topic: "General", title: "KYC VALIDATION'2025", description: "Regarding KYC Validation for 2025 batch.", user: "@anti21is", date: "2 days ago" },
    { id: 2, topic: "Training-Java", title: "P4 JAVA RETEST'2025", description: "P4 Java retest has been scheduled on 26th June 2024.", user: "@anti21is", date: "2 days ago" },
    { id: 3, topic: "Training-Python", title: "P4 PYTHON RETEST'2025", description: "P4 Python retest has been scheduled on 28th June 2024.", user: "@anti21is", date: "2 days ago" },
    { id: 4, topic: "Training-Python", title: "P4 PYTHON RETEST'2025", description: "P4 Python retest has been scheduled on 28th June 2024.", user: "@anti21is", date: "2 days ago" }
  ];

  return (
    <>
      <div className="row">
        <div className={`col-7 chat-card-container`}>
          <div className={`chat-card`}>
            {chats.map(chat => (
              <div className={`card`} key={chat.id}>
                <div className={`card-header`}>
                  {chat.topic}
                </div>
                <div className={`card-body`}>
                  <p><FaUserCircle className={`icon`} /> {chat.user}</p>
                  <h5 className={`card-title`}>{chat.title}</h5>
                  <p className={`card-text`}>{chat.description}</p>
                  <NavLink to={`${chat.id}`} className={`btn btn-primary`}>View</NavLink>
                </div>
                <div className={`card-footer text-body-secondary`}>
                  {chat.date}
                </div>
              </div>
            ))}
          </div>
        </div>
            
        <div className={`col-4 chat-form`}>
          <form action="">
            <div>
              <h5><IoIosChatboxes className={`icon`} /> Create Chat </h5>
              <hr />
              <label htmlFor="topic">Topic</label> <br />
              <select name="topic" className={`chat-field`}>
                <option value="">General</option>
                <option value="">Training-Aptitude</option>
                <option value="">Training-Soft Skills</option>
                <option value="">Training-Java</option>
                <option value="">Training-Python</option>
                <option value="">Training-Core</option>
              </select><br />
              <label htmlFor="batch">Batch</label><br />
              <select name="batch" className={`chat-field`}>
                <option value="">----</option>
                <option value="">2025</option>
                <option value="">2026</option>
              </select><br />
              <label htmlFor="name">Name</label><br />
              <input type="text" name="name" className={`chat-field`} /><br />
              <label htmlFor="description">Description</label><br />
              <textarea name="description" id="description" rows={4}></textarea><br />
              <button type="button" className={`btn btn-primary`}>Create</button>
              <button type="button" className={`btn btn-light`}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
  
    </>
  );
};

export default FPC;


