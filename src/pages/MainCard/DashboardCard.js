import React from "react";
import "../style/MainCard/DashboardCard.css";
import Sidebar from "../../components/Sidebar";
import DetectionCard from '../../components/DetectionCard';

function DashboardCard() {
   return (
    <div className="main_container">
      <Sidebar></Sidebar>
      <div className="detection">
        <div className="user_text">
          한별 님 안녕하세요!
        </div>
        <DetectionCard></DetectionCard>
      </div>
      <div className="detection_record">

      </div>
    </div>
  );
}

export default DashboardCard;