import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './css/Studentslist.module.css';

function Studentslist() {
  const { batch } = useParams();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [activeTab, setActiveTab] = useState('list');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newStudent, setNewStudent] = useState({
    sno: '',
    name: '',
    email: '',
    usn: '',
    phno: '',
    coreCx: { c1: '', c2: '', c3: '', c4: '', c5: '', c6: '', c7: '', c8: '' },
    coreProgramming: { cp1: '', cp2: '', cp3: '', cp4: '', cp5: '', cp6: '', cp7: '' },
    aptitude: { a1: '', a2: '', a3: '' },
    softSkills: { ss1: '', ss2: '', ss3: '' },
    language: { l1: '', l2: '', l3: '', l4: '', l5: '' },
    fsd: ''
  });
  const [marks, setMarks] = useState({
    coreCx: {},
    coreProgramming: {},
    aptitude: {},
    softSkills: {},
    language: {},
    fsd: ''
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/students');
        setStudents(response.data);
        setFilteredStudents(response.data);
      } catch (error) {
        console.error('Error fetching students', error);
      }
    };
    fetchStudents();
  }, []);

  const handleInputChange = (field, value) => {
    if (selectedStudent !== null) {
      const updatedStudents = [...students];
      updatedStudents[selectedStudent][field] = value;
      setStudents(updatedStudents);
      setFilteredStudents(updatedStudents);
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const newFilteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(term) ||
      student.email.toLowerCase().includes(term) ||
      student.usn.toLowerCase().includes(term)
    );

    setFilteredStudents(newFilteredStudents);
  };

  const handleNewStudentChange = (field, value) => {
    setNewStudent(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleAddStudent = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/students', newStudent);
      alert("Student added successfully");
      setStudents(prevStudents => [...prevStudents, response.data]);
      setFilteredStudents(prevStudents => [...prevStudents, response.data]);
      setNewStudent({
        sno: '',
        name: '',
        email: '',
        usn: '',
        phno: '',
        coreCx: { c1: '', c2: '', c3: '', c4: '', c5: '', c6: '', c7: '', c8: '' },
        coreProgramming: { cp1: '', cp2: '', cp3: '', cp4: '', cp5: '', cp6: '', cp7: '' },
        aptitude: { a1: '', a2: '', a3: '' },
        softSkills: { ss1: '', ss2: '', ss3: '' },
        language: { l1: '', l2: '', l3: '', l4: '', l5: '' },
        fsd: ''
      });
    } catch (error) {
      console.error('Error adding student', error);
    }
  };

  const handleUpdateStudent = async () => {
    if (selectedStudent !== null) {
      const studentId = students[selectedStudent]._id;
      try {
        await axios.put(`http://localhost:8000/api/students/${studentId}`, students[selectedStudent]);
        alert('Student updated successfully');
        setSelectedStudent(null);
      } catch (error) {
        console.error('Error updating student', error);
      }
    }
  };

  const handleUpdateMarks = async () => {
    if (selectedStudent !== null) {
      const studentId = students[selectedStudent]._id;
      try {
        await axios.patch(`http://localhost:8000/api/students/${studentId}/marks`, marks);
        alert('Marks updated successfully');
        setMarks({
          coreCx: {},
          coreProgramming: {},
          aptitude: {},
          softSkills: {},
          language: {},
          fsd: ''
        });
      } catch (error) {
        console.error('Error updating marks', error);
      }
    }
  };

  const handleMarksChange = (category, field, value) => {
    setMarks(prevState => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [field]: value
      }
    }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Students in {batch} Batch</h2>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by name, email, or USN"
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchBar}
        />
      </div>
      <div className={styles.tabContainer}>
        <button onClick={() => setActiveTab('addStudent')} className={styles.tabButton}>Add Student</button>
        <button onClick={() => setActiveTab('list')} className={styles.tabButton}>Student List</button>
        {selectedStudent !== null && (
          <button onClick={() => setActiveTab('updateMarks')} className={styles.tabButton}>Update Marks</button>
        )}
      </div>
      {activeTab === 'addStudent' && (
        <div className={styles.addStudentForm}>
          <h3>Add New Student</h3>
          <label>
            Name:
            <input
              type="text"
              value={newStudent.name}
              onChange={(e) => handleNewStudentChange('name', e.target.value)}
              className={styles.formControl}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              value={newStudent.email}
              onChange={(e) => handleNewStudentChange('email', e.target.value)}
              className={styles.formControl}
            />
          </label>
          <label>
            USN:
            <input
              type="text"
              value={newStudent.usn}
              onChange={(e) => handleNewStudentChange('usn', e.target.value)}
              className={styles.formControl}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              value={newStudent.phno}
              onChange={(e) => handleNewStudentChange('phno', e.target.value)}
              className={styles.formControl}
            />
          </label>
          <button onClick={handleAddStudent} className={styles.addButton}>Add Student</button>
        </div>
      )}
      {activeTab === 'list' && (
        <>
          <table className={styles.studentTable}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>USN</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student._id} onClick={() => setSelectedStudent(index)}>
                  <td>{student.sno}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.usn}</td>
                  <td>{student.phno}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedStudent !== null && (
            <div className={styles.editForm}>
              <h3>Edit Student: {students[selectedStudent].name}</h3>
              <label>
                Name:
                <input
                  type="text"
                  value={students[selectedStudent].name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={styles.formControl}
                />
              </label>
              <label>
                Email:
                <input
                  type="text"
                  value={students[selectedStudent].email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={styles.formControl}
                />
              </label>
              <label>
                USN:
                <input
                  type="text"
                  value={students[selectedStudent].usn}
                  onChange={(e) => handleInputChange('usn', e.target.value)}
                  className={styles.formControl}
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="text"
                  value={students[selectedStudent].phno}
                  onChange={(e) => handleInputChange('phno', e.target.value)}
                  className={styles.formControl}
                />
              </label>
              <button onClick={handleUpdateStudent} className={styles.updateButton}>
                Update Student
              </button>
            </div>
          )}
        </>
      )}
      {activeTab === 'updateMarks' && selectedStudent !== null && (
        <div className={styles.editForm}>
          <h3>Update Marks for {students[selectedStudent].name}</h3>
          <h4>Core CX</h4>
          {Object.keys(students[selectedStudent].coreCx).map((key) => (
            <label key={key}>
              {key}:
              <input
                type="text"
                value={marks.coreCx[key] || students[selectedStudent].coreCx[key]}
                onChange={(e) => handleMarksChange('coreCx', key, e.target.value)}
                className={styles.formControl}
              />
            </label>
          ))}
          <h4>Core Programming</h4>
          {Object.keys(students[selectedStudent].coreProgramming).map((key) => (
            <label key={key}>
              {key}:
              <input
                type="text"
                value={marks.coreProgramming[key] || students[selectedStudent].coreProgramming[key]}
                onChange={(e) => handleMarksChange('coreProgramming', key, e.target.value)}
                className={styles.formControl}
              />
            </label>
          ))}
          <h4>Aptitude</h4>
          {Object.keys(students[selectedStudent].aptitude).map((key) => (
            <label key={key}>
              {key}:
              <input
                type="text"
                value={marks.aptitude[key] || students[selectedStudent].aptitude[key]}
                onChange={(e) => handleMarksChange('aptitude', key, e.target.value)}
                className={styles.formControl}
              />
            </label>
          ))}
          <h4>Soft Skills</h4>
          {Object.keys(students[selectedStudent].softSkills).map((key) => (
            <label key={key}>
              {key}:
              <input
                type="text"
                value={marks.softSkills[key] || students[selectedStudent].softSkills[key]}
                onChange={(e) => handleMarksChange('softSkills', key, e.target.value)}
                className={styles.formControl}
              />
            </label>
          ))}
          <h4>Language</h4>
          {Object.keys(students[selectedStudent].language).map((key) => (
            <label key={key}>
              {key}:
              <input
                type="text"
                value={marks.language[key] || students[selectedStudent].language[key]}
                onChange={(e) => handleMarksChange('language', key, e.target.value)}
                className={styles.formControl}
              />
            </label>
          ))}
          <label>
            FSD:
            <input
              type="text"
              value={marks.fsd || students[selectedStudent].fsd}
              onChange={(e) => setMarks(prevState => ({ ...prevState, fsd: e.target.value }))}
              className={styles.formControl}
            />
          </label>
          <button onClick={handleUpdateMarks} className={styles.updateButton}>
            Update Marks
          </button>
        </div>
      )}
    </div>
  );
}

export default Studentslist;