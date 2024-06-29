import React, { useState, useEffect } from 'react';
import styles from './css/Recentactivity.module.css'; // Import CSS module

// Mock data (replace with actual API calls)
const mockChatrooms = [
  { id: 1, topic: 'Technology', participants: 24, lastActivity: '2 hours ago' },
  { id: 2, topic: 'Science', participants: 18, lastActivity: '1 hour ago' },
  // Add more as needed
];

const mockNews = [
  { id: 1, topic: 'MIT', headline: 'New Breakthrough in AI Research', summary: 'Researchers have achieved...', imageUrl: 'url_to_image', timestamp: '2024-06-25T10:30:00Z' },
  { id: 2, topic: 'Caltech', headline: 'COVID-19 Vaccine Update', summary: 'Latest updates on vaccine efficacy...', imageUrl: 'url_to_image', timestamp: '2024-06-25T09:15:00Z' },
  { id: 3, topic: 'Stanford', headline: 'Advancements in Renewable Energy', summary: 'New methods discovered for...', imageUrl: 'url_to_image', timestamp: '2024-06-25T08:00:00Z' },
  { id: 4, topic: 'Harvard', headline: 'Robotics Innovation Summit Recap', summary: 'Key insights from the summit...', imageUrl: 'url_to_image', timestamp: '2024-06-25T07:00:00Z' },
  // Add more as needed
];

const RecentActivityTab = () => {
  const [chatrooms, setChatrooms] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Simulate fetching chatrooms and news (replace with actual API calls)
    setChatrooms(mockChatrooms);
    setNews(mockNews);
  }, []);

  return (
    <div>
      <div className={styles['recent-activity-tab']}>
        <div className={styles['bulletin-board']}>
          <h2 className={styles['news-board']}>Latest News</h2>
          <div className={styles['news-board']}>
            <div className={styles['news-section']}>
              <h3 className={styles['news-section-header']}>MIT</h3>
              {news.filter(item => item.topic === 'MIT').map(item => (
                <div key={item.id} className={styles['news-item']}>
                  <div className={styles['news-image']}>
                    <img src={item.imageUrl} alt={item.headline} />
                  </div>
                  <div className={styles['news-details']}>
                    <h3>{item.headline}</h3>
                    <p>{item.summary}</p>
                    <p>Published: {new Date(item.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles['news-section']}>
              <h3 className={styles['news-section-header']}>Caltech</h3>
              {news.filter(item => item.topic === 'Caltech').map(item => (
                <div key={item.id} className={styles['news-item']}>
                  <div className={styles['news-image']}>
                    <img src={item.imageUrl} alt={item.headline} />
                  </div>
                  <div className={styles['news-details']}>
                    <h3>{item.headline}</h3>
                    <p>{item.summary}</p>
                    <p>Published: {new Date(item.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles['news-section']}>
              <h3 className={styles['news-section-header']}>Stanford</h3>
              {news.filter(item => item.topic === 'Stanford').map(item => (
                <div key={item.id} className={styles['news-item']}>
                  <div className={styles['news-image']}>
                    <img src={item.imageUrl} alt={item.headline} />
                  </div>
                  <div className={styles['news-details']}>
                    <h3>{item.headline}</h3>
                    <p>{item.summary}</p>
                    <p>Published: {new Date(item.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles['news-section']}>
              <h3 className={styles['news-section-header']}>Harvard</h3>
              {news.filter(item => item.topic === 'Harvard').map(item => (
                <div key={item.id} className={styles['news-item']}>
                  <div className={styles['news-image']}>
                    <img src={item.imageUrl} alt={item.headline} />
                  </div>
                  <div className={styles['news-details']}>
                    <h3>{item.headline}</h3>
                    <p>{item.summary}</p>
                    <p>Published: {new Date(item.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles['chatrooms-section']}>
          <h2>Chatrooms</h2>
          {chatrooms.map(chatroom => (
            <div key={chatroom.id} className={styles['chatroom-item']}>
              <div className={styles['chatroom-details']}>
                <h3>{chatroom.topic}</h3>
                <p>Participants: {chatroom.participants}</p>
                <p>Last Activity: {chatroom.lastActivity}</p>
              </div>
              {/* Add functionality for joining chatroom */}
              <button className={styles['join-button']}>Join</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivityTab;
