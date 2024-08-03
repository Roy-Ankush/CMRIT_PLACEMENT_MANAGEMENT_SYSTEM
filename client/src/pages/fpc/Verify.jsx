import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './css/Verify.module.css';

function Verify() {
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [studentsError, setStudentsError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

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

  const handleDetails = (student) => {
    setSelectedStudent(student);
  };

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
            <th>Details</th>
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
              <td>
                {student.status === 'Verified' ? (
                  <span>N/A</span>
                ) : (
                  <button 
                    onClick={() => handleVerify(student._id)} 
                    disabled={verifying}
                    className={styles.verifyButton}
                  >
                    {verifying ? 'Verifying...' : 'Verify'}
                  </button>
                )}
              </td>
              <td>
                <button 
                  onClick={() => handleDetails(student)} 
                  className={styles.detailsButton}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedStudent && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Student Details</h2>
            <p><strong>Name:</strong> {selectedStudent.name}</p>
            <p><strong>USN:</strong> {selectedStudent.usn}</p>
            <p><strong>Status:</strong> {selectedStudent.status}</p>
            <p><strong>UG Marks Link:</strong> <a href={selectedStudent.ugMarksLink} target="_blank" rel="noopener noreferrer">View Document</a></p>
            <p><strong>Resume Link:</strong> <a href={selectedStudent.resumeLink} target="_blank" rel="noopener noreferrer">View Document</a></p>
            <p><strong>Video Resume Link:</strong> <a href={selectedStudent.videoResumeLink} target="_blank" rel="noopener noreferrer">View Document</a></p>
            <p><strong>Tenth Marks Link:</strong> <a href={selectedStudent.tenthMarksLink} target="_blank" rel="noopener noreferrer">View Document</a></p>
            <p><strong>Twelfth Marks Link:</strong> <a href={selectedStudent.twelfthMarksLink} target="_blank" rel="noopener noreferrer">View Document</a></p>
            <p><strong>PAN Link:</strong> <a href={selectedStudent.panLink} target="_blank" rel="noopener noreferrer">View Document</a></p>
            <p><strong>Aadhar Link:</strong> <a href={selectedStudent.aadharLink} target="_blank" rel="noopener noreferrer">View Document</a></p>
            <p><strong>Passport Link:</strong> <a href={selectedStudent.passportLink} target="_blank" rel="noopener noreferrer">View Document</a></p>
            <p><strong>Photo Link:</strong> <a href={selectedStudent.photoLink} target="_blank" rel="noopener noreferrer">View Document</a></p>
            <p><strong>College ID Link:</strong> <a href={selectedStudent.collegeIdLink} target="_blank" rel="noopener noreferrer">View Document</a></p>
            <button onClick={() => setSelectedStudent(null)} className={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Verify;
