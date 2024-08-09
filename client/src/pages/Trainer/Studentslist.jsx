import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./css/Studentslist.module.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Studentslist() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isMarksModalOpen, setMarksModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [marks, setMarks] = useState({
    coreCx: { c1: "", c2: "", c3: "", c4: "", c5: "", c6: "", c7: "", c8: "" },
    coreProgramming: {
      cp1: "",
      cp2: "",
      cp3: "",
      cp4: "",
      cp5: "",
      cp6: "",
      cp7: "",
    },
    aptitude: { a1: "", a2: "", a3: "" },
    softSkills: { ss1: "", ss2: "", ss3: "" },
    language: { l1: "", l2: "", l3: "", l4: "", l5: "" },
    fsd: "",
  });
  const [newStudent, setNewStudent] = useState({
    name: "",
    usn: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/students"
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students", error);
      }
    };
    fetchStudents();
  }, []);

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setEditModalOpen(true);
  };

  const handleMarksClick = (student) => {
    setSelectedStudent(student);
    setMarks({
      coreCx: student.coreCx || {
        c1: "",
        c2: "",
        c3: "",
        c4: "",
        c5: "",
        c6: "",
        c7: "",
        c8: "",
      },
      coreProgramming: student.coreProgramming || {
        cp1: "",
        cp2: "",
        cp3: "",
        cp4: "",
        cp5: "",
        cp6: "",
        cp7: "",
      },
      aptitude: student.aptitude || { a1: "", a2: "", a3: "" },
      softSkills: student.softSkills || { ss1: "", ss2: "", ss3: "" },
      language: student.language || { l1: "", l2: "", l3: "", l4: "", l5: "" },
      fsd: student.fsd || "",
    });
    setMarksModalOpen(true);
  };

  const handleAddClick = () => {
    setNewStudent({
      name: "",
      usn: "",
      email: "",
      phoneNumber: "",
    });
    setAddModalOpen(true);
  };

  const handleEditChange = (field, value) => {
    setSelectedStudent((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleMarksChange = (category, field, value) => {
    if (category === "fsd") {
      setMarks((prevState) => ({
        ...prevState,
        fsd: value,
      }));
    } else {
      setMarks((prevState) => ({
        ...prevState,
        [category]: {
          ...prevState[category],
          [field]: value,
        },
      }));
    }
  };

  const handleNewStudentChange = (field, value) => {
    setNewStudent((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/user/students/${selectedStudent._id}`,
        selectedStudent
      );
      toast.success('Student details updated successfully', {
        position: 'top-center',
        autoClose: 1500,
        pauseOnHover: false
      })
      setEditModalOpen(false);
      const response = await axios.get(
        "http://localhost:8000/api/user/students"
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error updating student details", error);
    }
  };

  const handleSaveMarks = async () => {
    try {
      await axios.patch(
        `http://localhost:8000/api/user/students/${selectedStudent._id}/marks`,
        marks
      );
      toast.success('Marks updated successfully', {
        position: 'top-center',
        autoClose: 2000,
        pauseOnHover: false
      })
      setMarksModalOpen(false);
      const response = await axios.get(
        "http://localhost:8000/api/user/students"
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error updating marks", error);
    }
  };

  const handleAddStudent = async () => {
    try {
      await axios.post("http://localhost:8000/api/user/students", newStudent);
      
      toast.success('Student added successfully', {
        position: 'top-center',
        autoClose: 2000,
        pauseOnHover: false
      })
      setAddModalOpen(false);
      const response = await axios.get(
        "http://localhost:8000/api/user/students"
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error adding student", error);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.addStudentButton} onClick={handleAddClick}>
        Add Student
      </button>
      <table className={styles.studentTable}>
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Name</th>
            <th>Email</th>
            <th>USN</th>
            <th>Phone Number</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.usn}</td>
              <td>{student.phoneNumber}</td>
              <td>
                <button
                  className={styles.actionButton}
                  onClick={() => handleEditClick(student)}
                >
                  Edit Details
                </button>
              </td>
              <td>
                <button
                  className={styles.actionButton}
                  onClick={() => handleMarksClick(student)}
                >
                  Update Marks
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && selectedStudent && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Edit Details for {selectedStudent.name}</h3>
            <div className={styles.inputContainer}>
              <div className={styles.inputGroup}>
                <label>Name:</label>
                <input
                  type="text"
                  value={selectedStudent.name || ""}
                  onChange={(e) => handleEditChange("name", e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>USN:</label>
                <input
                  type="text"
                  value={selectedStudent.usn || ""}
                  onChange={(e) => handleEditChange("usn", e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Email:</label>
                <input
                  type="email"
                  value={selectedStudent.email || ""}
                  onChange={(e) => handleEditChange("email", e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Phone Number:</label>
                <input
                  type="text"
                  value={selectedStudent.phoneNumber || ""}
                  onChange={(e) =>
                    handleEditChange("phoneNumber", e.target.value)
                  }
                />
              </div>
            </div>
            <div className={styles.actionButtons}>
              <button className={styles.saveButton} onClick={handleSaveChanges}>
                Save Changes
              </button>
              <button
                className={styles.closeButton}
                onClick={() => setEditModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isMarksModalOpen && selectedStudent && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Update Marks for {selectedStudent.name}</h3>
            <h4>Core CX</h4>
            {Object.keys(marks.coreCx).map((key) => (
              <label key={key}>
                {key}:
                <input className={styles.inputGroup}
                  type="text"
                  value={marks.coreCx[key] || ""}
                  onChange={(e) =>
                    handleMarksChange("coreCx", key, e.target.value)
                  }
                />
              </label>
            ))}
            <h4>Core Programming</h4>
            {Object.keys(marks.coreProgramming).map((key) => (
              <label key={key}>
                {key}:
                <input className={styles.inputGroup}
                  type="text"
                  value={marks.coreProgramming[key] || ""}
                  onChange={(e) =>
                    handleMarksChange("coreProgramming", key, e.target.value)
                  }
                />
              </label>
            ))}
            <h4>Aptitude</h4>
            {Object.keys(marks.aptitude).map((key) => (
              <label key={key}>
                {key}:
                <input className={styles.inputGroup}
                  type="text"
                  value={marks.aptitude[key] || ""}
                  onChange={(e) =>
                    handleMarksChange("aptitude", key, e.target.value)
                  }
                />
              </label>
            ))}
            <h4>Soft Skills</h4>
            {Object.keys(marks.softSkills).map((key) => (
              <label key={key}>
                {key}:
                <input className={styles.inputGroup}
                  type="text"
                  value={marks.softSkills[key] || ""}
                  onChange={(e) =>
                    handleMarksChange("softSkills", key, e.target.value)
                  }
                />
              </label>
            ))}
            <h4>Language</h4>
            {Object.keys(marks.language).map((key) => (
              <label key={key}>
                {key}:
                <input className={styles.inputGroup}
                  type="text"
                  value={marks.language[key] || ""}
                  onChange={(e) =>
                    handleMarksChange("language", key, e.target.value)
                  }
                />
              </label>
            ))}
            <label>
              FSD:
              <input className={styles.inputGroup}
                type="text"
                value={marks.fsd || ""}
                onChange={(e) => handleMarksChange("fsd", null, e.target.value)}
              />
            </label>
            <button className={styles.saveButton} onClick={handleSaveMarks}>
              Save Marks
            </button>
            <button
              className={styles.closeButton}
              onClick={() => setMarksModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className={styles.modal}>
          <div className={`${styles.modalContent} ${styles.addStudentModal}`}>
            <h3>Add New Student</h3>
            <div className={styles.inputContainer}>
              <div className={styles.inputGroup}>
                <label>Name:</label>
                <input
                  type="text"
                  value={newStudent.name || ""}
                  onChange={(e) =>
                    handleNewStudentChange("name", e.target.value)
                  }
                />
              </div>
              <div className={styles.inputGroup}>
                <label>USN:</label>
                <input
                  type="text"
                  value={newStudent.usn || ""}
                  onChange={(e) =>
                    handleNewStudentChange("usn", e.target.value)
                  }
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Email:</label>
                <input
                  type="email"
                  value={newStudent.email || ""}
                  onChange={(e) =>
                    handleNewStudentChange("email", e.target.value)
                  }
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Phone Number:</label>
                <input
                  type="text"
                  value={newStudent.phoneNumber || ""}
                  onChange={(e) =>
                    handleNewStudentChange("phoneNumber", e.target.value)
                  }
                />
              </div>
            </div>
            <button
              className={`${styles.saveButton} ${styles.addStudentModal}`}
              onClick={handleAddStudent}
            >
              Add Student
            </button>
            <button
              className={`${styles.closeButton} ${styles.addStudentModal}`}
              onClick={() => setAddModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Studentslist;
