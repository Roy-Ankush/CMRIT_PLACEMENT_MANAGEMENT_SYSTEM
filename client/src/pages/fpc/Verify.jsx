import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './css/Verify.module.css';

function Verify() {
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [studentsError, setStudentsError] = useState('');
  const [verifying, setVerifying] = useState(false);

  const fetchStudents = async () => {
    setStudentsLoading(true);
    setStudentsError('');

    try {
      const response = await axios.get('http://localhost:8000/api/user/fetch_student');
      setStudents(response.data);
    } catch (err) {
      setStudentsError('Error fetching students from the database.');
      console.error(err);
    } finally {
      setStudentsLoading(false);
    }
  };

  const handleVerify = async (studentId) => {
    setVerifying(true);
    setStudentsError('');

    try {
      await axios.post(`http://localhost:8000/api/user/verify_student/${studentId}`);
      fetchStudents(); // Refresh the student list after verification
    } catch (err) {
      setStudentsError('Error verifying student.');
      console.error(err);
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Student List</h1>
      {studentsLoading && <p>Loading...</p>}
      {studentsError && <p className={styles.error}>{studentsError}</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>USN</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.usn}</td>
              <td className={student.status === 'Verified' ? styles.verified : styles.notVerified}>
                {student.status}
              </td>
              {student.status === 'Not Verified' && (
                <td>
                  <button 
                    onClick={() => handleVerify(student._id)} 
                    disabled={verifying}
                    className={styles.verifyButton}
                  >
                    {verifying ? 'Verifying...' : 'Verify'}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Verify;
