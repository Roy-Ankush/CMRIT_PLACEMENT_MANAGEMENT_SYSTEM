import React, { useState } from 'react';
import axios from 'axios';
import styles from './css/PlacementForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [formData, setFormData] = useState({
    ugMarksLink: '',
    resumeLink: '',
    videoResumeLink: '',
    tenthMarksLink: '',
    twelfthMarksLink: '',
    panLink: '',
    aadharLink: '',
    passportLink: '',
    photoLink: '',
    collegeIdLink: ''
  });

  const [tableContent, setTableContent] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isValidGoogleDriveLink = (link) => {
    const regex = /https:\/\/drive\.google\.com\/file\/d\/[-\w]{25,}/;
    return regex.test(link);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setTableContent([]);
    setLoading(true);
    setSubmitted(false);

    for (let key in formData) {
      if (!isValidGoogleDriveLink(formData[key]) && key !== 'passportLink') {
        setError('Invalid Google Drive link for ' + key.replace(/Link/, ''));
        setLoading(false);
        return;
      }
    }

    try {
      const response = await axios.post('http://localhost:8000/api/user/marks_verification', formData);
      const { mismatches } = response.data;
      setTableContent(mismatches);

      // Log all details to the console
      console.log('Fetched data:', response.data);
      console.log('Mismatches:', mismatches);
      setSubmitted(true);
    } catch (err) {
      setError('Error fetching or parsing PDF. Please check the console for more details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.App}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="resumeLink"
          placeholder="Resume Link"
          value={formData.resumeLink}
          onChange={handleChange}
          aria-label="Resume Link"
        />
        <input
          type="text"
          name="videoResumeLink"
          placeholder="Video Resume Link"
          value={formData.videoResumeLink}
          onChange={handleChange}
          aria-label="Video Resume Link"
        />
        <input
          type="text"
          name="tenthMarksLink"
          placeholder="10th Marks Link"
          value={formData.tenthMarksLink}
          onChange={handleChange}
          aria-label="10th Marks Link"
        />
        <input
          type="text"
          name="twelfthMarksLink"
          placeholder="12th Marks Link"
          value={formData.twelfthMarksLink}
          onChange={handleChange}
          aria-label="12th Marks Link"
        />
        <input
          type="text"
          name="ugMarksLink"
          placeholder="UG Marks Link"
          value={formData.ugMarksLink}
          onChange={handleChange}
          aria-label="UG Marks Link"
        />
        <input
          type="text"
          name="panLink"
          placeholder="PAN Link"
          value={formData.panLink}
          onChange={handleChange}
          aria-label="PAN Link"
        />
        <input
          type="text"
          name="aadharLink"
          placeholder="Aadhar Link"
          value={formData.aadharLink}
          onChange={handleChange}
          aria-label="Aadhar Link"
        />
        <input
          type="text"
          name="passportLink"
          placeholder="Passport Link (optional)"
          value={formData.passportLink}
          onChange={handleChange}
          aria-label="Passport Link (optional)"
        />
        <input
          type="text"
          name="photoLink"
          placeholder="Photo Link"
          value={formData.photoLink}
          onChange={handleChange}
          aria-label="Photo Link"
        />
        <input
          type="text"
          name="collegeIdLink"
          placeholder="College ID Link"
          value={formData.collegeIdLink}
          onChange={handleChange}
          aria-label="College ID Link"
        />
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {loading && (
        <div className={styles.spinner}>
          <FontAwesomeIcon icon={faSpinner} spin size="lg" />
        </div>
      )}
      {submitted && !loading && (
        <div className={styles.spinner}>
          <FontAwesomeIcon icon={faCheck} size="lg" />
        </div>
      )}
    </div>
  );
}

export default App;
