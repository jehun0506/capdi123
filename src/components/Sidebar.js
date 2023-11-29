import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCog,
  faChartBar,
  faClipboard,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import "./style/Sidebar.css";
import Logo_P from "../assets/Logo_P.png";

function Sidebar() {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/");
  };

  const handleReportsClick = () => {
    navigate("/reports");
  };

  const handleNotificationsClick = () => {
    navigate("/notifications");
  };

  return (
    <div className="sidebar_container">
      <div className="rt_title" onClick={handleDashboardClick}>
        <img className="logo_img" src={Logo_P} alt="로고" />
        RT SERVICE
      </div>
      <div className="menu_container">
        <div className="menu_title">Menu</div>
        <div
          className="menu_btn"
          onClick={handleDashboardClick}
        >
          <FontAwesomeIcon
            className="icon_style"
            icon={faChartBar}
          />
          <div>Dashboard</div>
        </div>
        <div className="menu_btn" onClick={handleReportsClick}>
          <FontAwesomeIcon
            className="icon_style"
            icon={faClipboard}
          />
          <div>Reports</div>
        </div>
        <div
          className="menu_btn"
          onClick={handleNotificationsClick}
        >
          <FontAwesomeIcon
            className="icon_style"
            icon={faBell}
          />
          <div>Notifications</div>
        </div>
      </div>
      <div className="user_info">
        <div className="avartar">
          <FontAwesomeIcon
            className="user_icon"
            icon={faUser}
          />
        </div>
        <div className="info">
          <div className="login_info">name</div>
          <div className="login_info">email</div>
        </div>
        <div className="setting">
          <FontAwesomeIcon
            className="setting_icon"
            icon={faCog}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
