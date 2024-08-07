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
      console.log('Fetched data:', response.data);
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
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.leftSide}>
            <h2>Documents</h2>
            <input
            className={styles.placementData}
              type="text"
              name="resumeLink"
              placeholder="Resume Link"
              value={formData.resumeLink}
              onChange={handleChange}
              aria-label="Resume Link"
            />
            <input
            className={styles.placementData}
              type="text"
              name="videoResumeLink"
              placeholder="Video Resume Link"
              value={formData.videoResumeLink}
              onChange={handleChange}
              aria-label="Video Resume Link"
            />
            <input
            className={styles.placementData}
              type="text"
              name="panLink"
              placeholder="PAN Link"
              value={formData.panLink}
              onChange={handleChange}
              aria-label="PAN Link"
            />
            <input
            className={styles.placementData}
              type="text"
              name="aadharLink"
              placeholder="Aadhar Link"
              value={formData.aadharLink}
              onChange={handleChange}
              aria-label="Aadhar Link"
            />
            <input
            className={styles.placementData}
              type="text"
              name="photoLink"
              placeholder="Photo Link"
              value={formData.photoLink}
              onChange={handleChange}
              aria-label="Photo Link"
            />
            <input
            className={styles.placementData}
              type="text"
              name="collegeIdLink"
              placeholder="College ID Link"
              value={formData.collegeIdLink}
              onChange={handleChange}
              aria-label="College ID Link"
            />
            <input
            className={styles.placementData}
              type="text"
              name="passportLink"
              placeholder="Passport Link (optional)"
              value={formData.passportLink}
              onChange={handleChange}
              aria-label="Passport Link (optional)"
            />
          </div>

          <div className={styles.rightSide}>
            <h2>Marks</h2>
            <input
            className={styles.placementData}
              type="text"
              name="tenthMarksLink"
              placeholder="10th Marks Link"
              value={formData.tenthMarksLink}
              onChange={handleChange}
              aria-label="10th Marks Link"
            />
            <input
            className={styles.placementData}
              type="text"
              name="twelfthMarksLink"
              placeholder="12th Marks Link"
              value={formData.twelfthMarksLink}
              onChange={handleChange}
              aria-label="12th Marks Link"
            />
            <input
            className={styles.placementData}
              type="text"
              name="ugMarksLink"
              placeholder="UG Marks Link"
              value={formData.ugMarksLink}
              onChange={handleChange}
              aria-label="UG Marks Link"
            />
          </div>

          <button className={styles.button1} type="submit" disabled={loading}>
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}
          </button>

          {error && <p className={styles.error}>{error}</p>}
          {submitted && !loading && (
            <div className={styles.spinner}>
              <FontAwesomeIcon icon={faCheck} size="lg" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;