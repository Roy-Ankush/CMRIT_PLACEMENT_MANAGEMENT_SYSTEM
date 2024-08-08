import React, { useState } from "react";
import "./css/officer.css";
import CommonChat from "../../components/CommonChat";
import { IoChatbubblesSharp } from "react-icons/io5";

const OfficerHome = () => {
  // State to manage form inputs and file
  const [driveData, setDriveData] = useState({
    batch: "",
    company: "",
    criteria: "",
    registrationLink: "",
  });
  const [files, setFiles] = useState([]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriveData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleReset = () => {
    setDriveData({
      batch: "",
      company: "",
      criteria: "",
      registrationLink: "",
    });
    setFiles([]);
  };

  const handleSubmit = async (e) => {
    // console.log('Form submitted');
    e.preventDefault();

    const form = new FormData();
    form.append("batch", driveData.batch);
    form.append("company", driveData.company);
    form.append("criteria", driveData.criteria);
    form.append("registrationLink", driveData.registrationLink);

    files.forEach((file, index) => {
      form.append("uploads", file); // Use 'uploads' field name for multiple files
    });

    try {
      const response = await fetch("http://localhost:8000/api/user/drives", {
        method: "POST",
        body: form,
      });

      // console.log('Response Headers:', [...response.headers]);
      // console.log('Response Status:', response.status);

      const contentType = response.headers.get("Content-Type");
      let result;

      if (contentType.includes("application/json")) {
        result = await response.json();
      } else if (
        contentType.includes("text/html") ||
        contentType.includes("text/plain")
      ) {
        result = await response.text();
      } else {
        console.error("Unexpected content type:", contentType);
        return;
      }

      // console.log('Response Body:', result);

      if (response.ok) {
        console.log("Success:", result);
      } else {
        console.error("Error:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={`row`}>
      <div className={`col-sm-12 col-md-6`}>
        <div className={`form-container`}>
          <form onSubmit={handleSubmit} onReset={handleReset} encType="multipart/form-data">
            <h5>Create Drive</h5>
            <hr />
            <div className={`form-group`}>
              <label htmlFor="batch" className={`form-label`}>
                Batch
              </label>
              <select
                name="batch"
                id="batch"
                className={`form-control`}
                value={driveData.batch}
                onChange={handleChange}
              >
                <option value="">----</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
            <div className={`form-group`}>
              <label htmlFor="company" className={`form-label`}>
                Company Name
              </label>
              <input
                type="text"
                name="company"
                id="company"
                className={`form-control`}
                value={driveData.company}
                onChange={handleChange}
              />
            </div>
            <div className={`form-group`}>
              <label htmlFor="criteria" className="form-label">
                Criteria
              </label>
              <textarea
                name="criteria"
                id="criteria"
                rows={4}
                value={driveData.criteria}
                onChange={handleChange}
                className={`form-control`}
              ></textarea>
            </div>
            <div className={`form-group`}>
              <label htmlFor="upload" className={`form-label`}>
                Upload Files
              </label>
              <input
                type="file"
                name="uploads"
                id="upload"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                className={`form-control`}
                multiple
              />
            </div>
            <div className={`form-group`}>
              <label htmlFor="link" className={`form-label`}>
                Registration Link
              </label>
              <input
                type="text"
                name="registrationLink"
                id="link"
                className={`form-control`}
                value={driveData.registrationLink}
                onChange={handleChange}
              />
            </div>
            <div className={`form-buttons`}>
              <button type="submit" className={`btn btn-primary`}>
                Create
              </button>
              <button type="reset" className={`btn btn-light`}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={`col-sm-12 col-md-6 mt-4 chat-container`}>
        <div className={`chat-title`}>
          <IoChatbubblesSharp className={`chat-icon`} />
          <h5>Chat</h5>
        </div>
        <CommonChat />
      </div>
    </div>
  );
};

export default OfficerHome;
