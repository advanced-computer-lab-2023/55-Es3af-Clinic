import UserService from "../services/userService";
import "../App.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import NotificationIcon from "./notificationBell";
import { useState } from "react";

const AdminNav = () => {
  let navigate = useNavigate();
  const [hasNotifications, setHasNotifications] = useState(true);
  async function logout() {
    UserService.logout()
      .then((res) => {
        navigate("/", { replace: true });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  
  const home = () => {
    navigate("../", { replace: true });
   
  };
  
  return (
    <nav className="navbar navbar-dark bg-primary">
      <ul className="nav">
        <li className="nav-item">
          <button
            className="nav-link"
            style={{ color: "white" }}
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link"
            style={{ color: "white" }}
            onClick={() => {
              home();
            }}
          >
            home
          </button>
        </li>
        <li className="nav-item">
        <a href="http://localhost:4000/admin" rel="noopener noreferrer">
          <button
            className="nav-link"
            style={{ color: "white" }}
           
          >
            Pharmacy
          </button>
          </a>
        </li>
      </ul>
      <div className="notification-icon-wrapper">
      <NotificationIcon hasNotifications={hasNotifications} />
      </div>
    </nav>
  );
};
export default AdminNav;
