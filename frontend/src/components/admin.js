import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import AddAdmin from "./addAdmin";
import UsersList from "./listUsers";
//import AdminService from "../services/adminService";
import DeleteUser from "./deleteUser";
import ViewDoctorRequests from "./viewDoctorRequests";
import packageService from "../services/packageService";
function AdminPage() {
  return (
    <Routes>

      <Route path="/" element={<AdminHome />} />
      <Route path="/addAdmin" element={<AddAdmin />} />
      <Route path="/users" element={<UsersList />} />
      <Route path="/deleteUser" element={<DeleteUser />} />
      <Route path="/viewDoctorData" element={<ViewDoctorRequests />} />
      <Route path="/view" element={<ViewDoctorRequests />} />


    </Routes>
  );
}

function AdminHome() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <a href="/admin/addAdmin" rel="noopener noreferrer">
            <button className="btn btn-primary"> Add Admin </button>
          </a>
        </div>
        <div>
          <a href="/admin/deleteUser" rel="noopener noreferrer">
            <button className="btn btn-primary"> Delete user </button>
          </a>
        </div>
        <div>
          <a href="/admin/viewDoctorData" rel="noopener noreferrer">
            <button className="btn btn-primary"> View incoming doctor requests </button>
          </a>
        </div>
        <div>
          <a href="/admin/packages" rel="noopener noreferrer">
            <button className="btn btn-primary"> Packages </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default AdminPage; 