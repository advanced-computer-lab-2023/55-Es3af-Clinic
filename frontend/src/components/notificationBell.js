import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import userService from "../services/userService";
import "../NotificationIcon.css"; // Import the CSS file for styling

const NotificationIcon = ({ hasNotifications }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const currentURL = window.location.href;
  const parts = currentURL.split("/");
  var userType = parts[3];

  const toggleNotifications = async () => {
    setShowNotifications(!showNotifications);
    await userService
      .getNotification(userType)
      .then((result) => {
        setNotifications(result.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="notification-icon-container">
      {hasNotifications ? (
        <div
          className={`notification-icon ${showNotifications ? "active" : ""}`}
          onClick={toggleNotifications}
        >
          <FaBell size={30} />
          <div className="notification-badge" />
        </div>
      ) : (
        <FaBell size={30} />
      )}
      {showNotifications && (
        <div className="notification-dropdown">
          <h3>Notifications</h3>
          <ul>
            {notifications.map((notification) => (
              <li key={notification.notifID}>
                {notification.message}
                <br />
                {notification.date}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
