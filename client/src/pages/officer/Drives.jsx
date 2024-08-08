
import React, { useEffect, useState } from 'react';

const Drives = () => {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        // console.log('Fetching drives...');
        const response = await fetch('http://localhost:8000/api/user/drives');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log('Fetched data:', data);

        // Add file URL to each drive object
        const drivesWithFiles = await Promise.all(data.map(async (drive) => {
          let filesWithUrls = null;
          if (drive.files) {

            const fileResponse = await fetch(`http://localhost:8000/api/user/drives/${drive._id}/files`);
            const files = await fileResponse.json();
  
            // Generate URLs for each file
            filesWithUrls = files.map(file => ({
              ...file,
              fileUrl: `http://localhost:8000/api/user/drives/${drive._id}/files/${file.fileName}`
            }));
          }

          const date = new Date(drive.createdAt);
          const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;

          return { ...drive, files: filesWithUrls, formattedDate };
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

  const handleDelete = async (driveId) => {
    try {
      console.log(`Deleting drive with ID: ${driveId}`);
      const response = await fetch(`http://localhost:8000/api/user/drives/${driveId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete drive');
      }

      // Remove the deleted drive from the state
      setDrives(prevDrives => prevDrives.filter(drive => drive._id !== driveId));
    } catch (error) {
      console.error('Error deleting drive:', error);
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`container mx-md-0 mx-sm-0 mx-lg-4`}>
      <div className={`row `}>
        {drives.map(drive => (
          <div key={drive._id} className={`col-12 mb-4 mt-3`}>
            <div className={`card drive-card`}>
              <div className={`card-header drive-header`}>{drive.topic}</div>
              <div className={`card-body`}>
                <h5 className={`card-title`}>Company: {drive.company}</h5>
                <p className={`card-text`}>Batch: {drive.batch}</p>
                <p className={`card-text`}>Criteria: {drive.criteria}</p>
                {drive.files && drive.files.length > 0 && (
                  <div>
                    <p className={`card-text`}>Attachments:</p>
                    <div className={`row`}>
                    {drive.files.map(file => (
                     <p key={file.fileName} className={`card-text col-auto`}>
                        <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">{file.fileName}</a>
                      </p>
                    ))}
                  </div>
                  </div>
                )}
                <p className={`card-text`}>Registration link: <a href={drive.registrationLink.startsWith('http') ? drive.registrationLink : `https://${drive.registrationLink}`} target="_blank" rel="noopener noreferrer">{drive.registrationLink}</a></p>
                
                <button className={`btn btn-primary`}>Chat</button>
                <button className={`btn btn-danger`} onClick={() => handleDelete(drive._id)}>Delete</button>
                <hr px-0/>
                <p className={`card-text`}>Created at: {drive.formattedDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
  );
};

export default Drives;