import UserService from "../services/userService";
//import "./App.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import NotificationIcon from "./notificationBell";
import { useState } from "react";

const Navbar = () => {
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
      </ul>
      <div className="notification-icon-wrapper">
      <NotificationIcon hasNotifications={hasNotifications} />
      </div>
    </nav>
  );
};
export default Navbar;
