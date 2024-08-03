import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './css/PlacementForm.module.css';
import Spinner from './Spinner';

function App() {
  const [gdriveLink, setGdriveLink] = useState('');
  const [studentInfo, setStudentInfo] = useState({});
  const [tableContent, setTableContent] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // const [students, setStudents] = useState([]);
  // const [studentsLoading, setStudentsLoading] = useState(false);
  // const [studentsError, setStudentsError] = useState('');

  const isValidGoogleDriveLink = (link) => {
    const regex = /https:\/\/drive\.google\.com\/file\/d\/[-\w]{25,}/;
    return regex.test(link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStudentInfo({});
    setTableContent([]);
    setLoading(true);

    if (!isValidGoogleDriveLink(gdriveLink)) {
      setError('Invalid Google Drive link.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/user/marks_verification', { gdriveLink });
      const { studentName, usn, semester, mismatches } = response.data;
      setStudentInfo({ studentName, usn, semester });
      setTableContent(mismatches);
    } catch (err) {
      setError('Error fetching or parsing PDF. Please check the console for more details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Marks Verification</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Google Drive link"
          value={gdriveLink}
          onChange={(e) => setGdriveLink(e.target.value)}
          aria-label="Google Drive link"
        />
        <button type="submit">Extract Table</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {loading ? (
        <div className={styles.spinner}><Spinner /></div>
      ) : (
        <>
          {Object.keys(studentInfo).length > 0 && (
            <div className={styles['student-info']}>
              <p><strong>Name:</strong> {studentInfo.studentName}</p>
              <p><strong>USN:</strong> {studentInfo.usn}</p>
              <p><strong>Semester:</strong> {studentInfo.semester}</p>
            </div>
          )}
          {tableContent.length > 0 && (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Subject Code</th>
                  <th>Total Marks</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tableContent.map((row, index) => (
                  <tr key={index}>
                    <td>{row.subjectCode}</td>
                    <td>{row.pdfMarks}</td>
                    <td className={row.status === 'Matched' ? styles.matched : styles['not-matched']}>
                      {row.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {/* <h2>Student List</h2>
      {studentsLoading ? (
        <div className={styles.spinner}><Spinner /></div>
      ) : studentsError ? (
        <p className={styles.error}>{studentsError}</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>USN</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.usn}</td>
                <td>{student.name}</td>
                <td>{student.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )} */}
    </div>
  );
}

export default App;
