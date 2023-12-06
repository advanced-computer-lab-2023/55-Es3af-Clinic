import UserService from "../services/userService";
//import "./App.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
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
    </nav>
  );
};
export default Navbar;
