import React, { useState } from 'react';
import './css/officer.css';
import { IoIosChatboxes } from "react-icons/io";

const OfficerHome = () => {
  // State to manage form inputs and file
  const [driveData, setDriveData] = useState({
    topic: '',
    batch: '',
    company: '',
    criteria: '',
  });
  const [file, setFile] = useState(null);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriveData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create driveData object
//     const form = new driveData();
//     form.append('topic', driveData.topic);
//     form.append('batch', driveData.batch);
//     form.append('company', driveData.company);
//     form.append('criteria', driveData.criteria);
//     if (file) {
//       form.append('upload', file);
//     }

//     try {
//       const response = await fetch('http://localhost:8000/api/user/drives', {
//         method: 'POST',
//         body: form
//       });
//     //   console.log(response)

//       if (response.ok) {
//         const result = await response.json();
//         console.log('Success:', result);
//         // Handle success (e.g., show a message or redirect)
//       } else {
//         console.error('Error:', response.statusText);
//         // Handle error
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       // Handle fetch error
//     }
//   };
const handleSubmit = async (e) => {
    console.log('Form submitted');
    e.preventDefault();
  
    const form = new FormData();
    form.append('topic', driveData.topic);
    form.append('batch', driveData.batch);
    form.append('company', driveData.company);
    form.append('criteria', driveData.criteria);
    if (file) {
      form.append('upload', file);
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/user/drives', {
        method: 'POST',
        body: form,
      });
  
      console.log('Response Headers:', [...response.headers]);
      console.log('Response Status:', response.status);
  
      const contentType = response.headers.get('Content-Type');
      let result;
      
      if (contentType.includes('application/json')) {
        result = await response.json();
      } else if (contentType.includes('text/html') || contentType.includes('text/plain')) {
        result = await response.text();
      } else {
        console.error('Unexpected content type:', contentType);
        return;
      }
  
      console.log('Response Body:', result);
  
      if (response.ok) {
        console.log('Success:', result);
      } else {
        console.error('Error:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  
  return (
    <div className={`container`}>
      <div className={`row`}>
        <div className={`col-4`}>
          <form onSubmit={handleSubmit}>
            <div>
              <h5><IoIosChatboxes className={`icon`} /> Create Drive </h5>
              <hr />
              <label htmlFor="topic">Topic</label><br />
              <select
              id='topic'
                name="topic"
                className={`chat-field`}
                value={driveData.topic}
                onChange={handleChange}
              >
                <option value="">-----</option>
                <option value="Drive">Drive</option>
              </select><br />
              <label htmlFor="batch">Batch</label><br />
              <select
                name="batch"
                id='batch'
                className={`chat-field`}
                value={driveData.batch}
                onChange={handleChange}
              >
                <option value="">----</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select><br />
              <label htmlFor="company">Company name</label><br />
              <input
                type="text"
                name="company"
                id='company'
                className={`chat-field`}
                value={driveData.company}
                onChange={handleChange}
              /><br />
              <label htmlFor="criteria">Criteria</label><br />
              <textarea
                name="criteria"
                id="criteria"
                rows={4}
                value={driveData.criteria}
                onChange={handleChange}
              ></textarea><br />
              <label htmlFor="upload">Upload files</label><br />
              <input
                type="file"
                name="upload"
                id='upload'
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
              /><br />
              <button type="submit" className={`btn btn-primary`}>Create</button>
              <button type="reset" className={`btn btn-light`}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OfficerHome;
