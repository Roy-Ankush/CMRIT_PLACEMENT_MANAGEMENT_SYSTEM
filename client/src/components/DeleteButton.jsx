import React from 'react';

const DeleteButton = ({ driveId, onDelete }) => (
  <button className={`btn btn-danger`} onClick={() => onDelete(driveId)}>Delete</button>
);

export default DeleteButton;