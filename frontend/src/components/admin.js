import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import AddAdmin from "./addAdmin";
import UsersList from "./listUsers";
import adminService from "../services/adminService";
function AdminPage() {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />

      <Route path="/addAdmin" element={<AddAdmin />} />

      <Route path="/users" element={<UsersList />} />







    </Routes>
  );
}

function AdminHome() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <a href="/admin/add-admin" rel="noopener noreferrer">
            <button className="btn btn-primary"> Add Admin </button>
          </a>
        </div>
        <div>
          <a href="/admin/users" rel="noopener noreferrer">
            <button className="btn btn-primary"> view users </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default AdminPage; 