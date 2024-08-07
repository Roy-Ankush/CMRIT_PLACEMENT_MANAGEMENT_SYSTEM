  import React from "react";
import Batches from "./Batches"; // Adjust the path according to your folder structure
import style from "./css/mainlayout.module.css";

function MainLayout() {
  return (
    <div className={style.container}>
      <div className={style.batchesSection}>
        <Batches />
      </div>
      <div className={style.chatroomSection}>
        {/* Placeholder for the chatroom */}
        <h2>Chatroom</h2>
        {/* Chatroom content goes here */}
      </div>
    </div>
  );
}

export default MainLayout;
