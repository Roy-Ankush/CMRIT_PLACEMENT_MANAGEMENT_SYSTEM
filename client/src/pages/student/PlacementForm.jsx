import React, { useState } from 'react';
import axios from 'axios';
import styles from './css/PlacementForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [gdriveLink, setGdriveLink] = useState('');
  const [tableContent, setTableContent] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isValidGoogleDriveLink = (link) => {
    const regex = /https:\/\/drive\.google\.com\/file\/d\/[-\w]{25,}/;
    return regex.test(link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setTableContent([]);
    setLoading(true);
    setSubmitted(false);

    if (!isValidGoogleDriveLink(gdriveLink)) {
      setError('Invalid Google Drive link.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/user/marks_verification', { gdriveLink });
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
      <h1>Upload Results</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Google Drive link"
          value={gdriveLink}
          onChange={(e) => setGdriveLink(e.target.value)}
          aria-label="Google Drive link"
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
