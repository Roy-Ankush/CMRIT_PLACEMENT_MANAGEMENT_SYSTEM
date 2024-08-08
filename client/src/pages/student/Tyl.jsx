import React, { useEffect, useState } from 'react';
import styles from './css/Tyl.module.css';
import axios from 'axios';

const Tyl = () => {
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        console.log('Fetching student data...');
        const response = await axios.get('http://localhost:8000/api/studentdata');
        console.log('Student data fetched:', response.data);
        setStudentData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching student data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    console.log('Loading...');
    return <p>Loading...</p>;
  }

  if (error) {
    console.error('Error:', error);
    return <p>Error: {error}</p>;
  }

  console.log('Student data:', studentData);

  const checkPassFail = (subjectMarks) => {
    return Object.values(subjectMarks).every(mark => parseFloat(mark) > 18) ? 'pass' : 'fail';
  };

  const cards = [
    {
      id: 1,
      title: 'Language',
      content: studentData.language ? Object.entries(studentData.language).map(([key, value]) => `${key}: ${value}`) : [],
      status: checkPassFail(studentData.language || {}),
    },
    {
      id: 2,
      title: 'Aptitude',
      content: studentData.aptitude ? Object.entries(studentData.aptitude).map(([key, value]) => `${key}: ${value}`) : [],
      status: checkPassFail(studentData.aptitude || {}),
    },
    {
      id: 3,
      title: 'Soft Skill',
      content: studentData.softSkills ? Object.entries(studentData.softSkills).map(([key, value]) => `${key}: ${value}`) : [],
      status: checkPassFail(studentData.softSkills || {}),
    },
    {
      id: 4,
      title: 'Programming',
      content: studentData.coreProgramming ? Object.entries(studentData.coreProgramming).map(([key, value]) => `${key}: ${value}`) : [],
      status: checkPassFail(studentData.coreProgramming || {}),
    },
    {
      id: 5,
      title: 'Core Test',
      content: studentData.coreCx ? Object.entries(studentData.coreCx).map(([key, value]) => `${key}: ${value}`) : [],
      status: checkPassFail(studentData.coreCx || {}),
    },
    {
      id: 6,
      title: 'FSD',
      content: [studentData.fsd || ''],
      status: studentData.fsd === 'pass' ? 'pass' : 'fail',
    },
  ];

  console.log('Cards:', cards);

  return (
    <div className={styles.container}>
      <div className={styles.markscards}>
        {cards.map((card) => (
          <div
            key={card.id}
            className={`${styles.card} ${styles[card.status]}`}
          >
            <h3>{card.title}</h3>
            {card.content.length > 0 ? (
              card.content.map((line, index) => (
                <p key={index} className={styles.cardContent}>{line}</p>
              ))
            ) : (
              <p>No data available</p>
            )}
            <p className={styles.status}>{card.status === 'pass' ? 'Pass' : 'Fail'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tyl;
