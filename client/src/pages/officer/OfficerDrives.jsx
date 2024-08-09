import React from 'react'
import Drives from '../../components/Drives'
import ChatButton from "../../components/ChatButton";
import DeleteButton from "../../components/DeleteButton";

const OfficerDrives = () => {
  return (
    <div>
      <Drives buttons={[ChatButton, DeleteButton]} />
    </div>
  )
}

export default OfficerDrives