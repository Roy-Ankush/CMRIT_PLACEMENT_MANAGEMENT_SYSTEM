import React from 'react';
import styles from './css/Tyl.module.css';

const Tyl = () => {
  
  const cards = [
    { id: 1, title: 'Language', content: ['L1:', 'L2:','L3:'] },
    { id: 2, title: 'Aptitude', content: ['A1:', 'A2:', 'A3:'] },
    { id: 3, title: 'Soft Skill', content: ['S1:','S2:','S3:'] },
    { id: 4, title: 'Programming', content: ['P2:', 'P3:', 'P4:'] },
    { id: 5, title: 'Core Test', content: ['C1:','C2:','C3:'] },
    { id: 6, title: 'FSD', content: ['Pass','Fail'] },
  ];

  return (
    <div>
      <div className={styles.markscards}>
        {/* Mapping over the cards array to create card components */}
        {cards.map((card) => (
          <div key={card.id} className={styles.card}>
            <h3>{card.title}</h3>
            {card.content.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tyl;
