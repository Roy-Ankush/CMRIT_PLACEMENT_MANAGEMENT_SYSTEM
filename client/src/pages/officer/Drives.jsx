// import React, { useEffect, useState } from 'react';

// const DrivesList = () => {
//   const [drives, setDrives] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDrives = async () => {
//       try {
//         console.log('Fetching drives...');
//         const response = await fetch('http://localhost:8000/api/user/drives');
//         console.log('Response Status:', response.status);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         console.log('Fetched data:', data);
//         setDrives(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchDrives();
//   }, []);
//   // Empty dependency array means this effect runs once when the component mounts

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h1>List of Drives</h1>
//       <ul>
//         {drives.map(drive => (
//           <li key={drive._id}>
//             <h2>{drive.topic}</h2>
//             <p>Batch: {drive.batch}</p>
//             <p>Company: {drive.company}</p>
//             <p>Criteria: {drive.criteria}</p>
//             {/* If you want to display the file, you would need to handle the file separately */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DrivesList;

import React, { useEffect, useState } from 'react';

const Drives = () => {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        console.log('Fetching drives...');
        const response = await fetch('http://localhost:8000/api/user/drives');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data);

        // Add file URL to each drive object
        const drivesWithFiles = await Promise.all(data.map(async (drive) => {
          if (drive.file) {
            const fileResponse = await fetch(`http://localhost:8000/api/user/drives/${drive._id}/file`);
            const fileBlob = await fileResponse.blob();
            const fileUrl = URL.createObjectURL(fileBlob);
            return { ...drive, fileUrl };
          }
          return drive;
        }));

        setDrives(drivesWithFiles);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrives();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>List of Drives</h1>
      <ul>
        {drives.map(drive => (
          <li key={drive._id}>
            <h2>{drive.topic}</h2>
            <p>Batch: {drive.batch}</p>
            <p>Company: {drive.company}</p>
            <p>Criteria: {drive.criteria}</p>
            {drive.fileUrl && (
              <div>
                <a href={drive.fileUrl} target="_blank" rel="noopener noreferrer">View File</a>
                {/* For displaying different file types, you can use additional logic */}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Drives;

