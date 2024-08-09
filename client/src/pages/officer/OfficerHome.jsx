import React, { useState } from "react";
import styles from "./css/officer.module.css";
import CommonChat from "../../components/CommonChat";
import { IoChatbubblesSharp } from "react-icons/io5";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


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
        // console.log("Success:", result);
        toast.success('Drive created', {
          position: 'bottom-left',
          autoClose: 2000,
          pauseOnHover: false
        })} 
        else {
          toast.error('Error creating Drive', {
            position: 'bottom-left',
            autoClose: 2000,
            pauseOnHover: false
          })
        console.error("Error:", result);

      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={`row ${styles.customRowStyle}`}>
      <div className={`col-sm-12 col-md-6 ${styles.customStyle}`}>
        <div className={styles.formContain}>
          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            encType="multipart/form-data"
          >
            <h5>Create Drive</h5>
            <hr />
            <div className={styles.formGroups}>
              <label htmlFor="batch" className={styles.formLabels}>
                Batch
              </label>
              <select
                name="batch"
                id="batch"
                className={styles.formControls}
                value={driveData.batch}
                onChange={handleChange}
              >
                <option value="">----</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
            <div className={styles.formGroups}>
              <label htmlFor="company" className={styles.formLabels}>
                Company Name
              </label>
              <input
                type="text"
                name="company"
                id="company"
                className={styles.formControls}
                value={driveData.company}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroups}>
              <label htmlFor="criteria" className={styles.formLabels}>
                Criteria
              </label>
              <textarea
                name="criteria"
                id="criteria"
                rows={4}
                value={driveData.criteria}
                onChange={handleChange}
                className={styles.formControls}
              ></textarea>
            </div>
            <div className={styles.formGroups}>
              <label htmlFor="upload" className={styles.formLabels}>
                Upload Files
              </label>
              <input
                type="file"
                name="uploads"
                id="upload"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                className={styles.formControls}
                multiple
              />
            </div>
            <div className={styles.formGroups}>
              <label htmlFor="link" className={styles.formLabels}>
                Registration Link
              </label>
              <input
                type="text"
                name="registrationLink"
                id="link"
                className={styles.formControls}
                value={driveData.registrationLink}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formButton}>
              <button
                type="submit"
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Create
              </button>
              <button
                type="reset"
                className={`${styles.btn} ${styles.btnLight}`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={`col-sm-12 col-md-6 mt-4`}>
        <CommonChat />
      </div>
    </div>
  );
};

export default OfficerHome;