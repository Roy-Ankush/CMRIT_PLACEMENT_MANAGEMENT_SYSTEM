import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Studentslist from './Studentslist.jsx'; // Make sure to import Studentslist component
import styles from './css/Batches.module.css'; // Import your CSS module

const batches = [
  { name: "CSE", branches: ["CSE21", "CSE22", "CSE23", "CSE24"] },
  { name: "ISE", branches: ["ISE21", "ISE22", "ISE23", "ISE24"] },
  { name: "AIML", branches: ["AIML21", "AIML22", "AIML23", "AIML24"] },
  { name: "AIDS", branches: ["AIDS21", "AIDS22", "AIDS23", "AIDS24"] },
  { name: "ECE", branches: ["ECE21", "ECE22", "ECE23", "ECE24"] },
  { name: "EEE", branches: ["EEE21", "EEE22", "EEE23", "EEE24"] }
];

function Batches() {
  const [selectedBatch, setSelectedBatch] = useState(null);
  const navigate = useNavigate();

  const handleBatchClick = (batch) => {
    setSelectedBatch(batch);
    navigate(`/placementtrainer/batches/${batch}`);
  };

  return (
    <div className={styles.container}>
      {selectedBatch ? (
        <Studentslist batch={selectedBatch} />
      ) : (
        <>
          
          <div className={styles.batchGroups}>
            {batches.map((batch) => (
              <div key={batch.name} className={styles.batchGroup}>
                <h3>{batch.name}</h3>
                <ul className={styles.branchList}>
                  {batch.branches.map((branch) => (
                    <li key={branch} className={styles.branchItem}>
                      <button onClick={() => handleBatchClick(branch)}>
                        {branch}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Batches;
