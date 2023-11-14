import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import AddAdmin from "./addAdmin";
import UsersList from "./listUsers";
//import AdminService from "../services/adminService";
import DeleteUser from "./deleteUser";
import ViewDoctorRequests from "./viewDoctorRequests";
import UpdatePassword from '../updatePassword';
import Packages from "./packages";
import packageService from "../../services/packageService";
import UpdatePackage from "../updatePackage";
import { Link } from "react-router-dom";
import Navbar from "../navbar";

function AdminPage() {
  return (
    <Routes>

      <Route path="/" element={<AdminHome />} />
      <Route path="/addAdmin/*" element={<AddAdmin />} />
      <Route path="/users/*" element={<UsersList />} />
      <Route path="/deleteUser/*" element={<DeleteUser />} />
      <Route path="/viewDoctorData/*" element={<ViewDoctorRequests />} />
      <Route path="/view/*" element={<ViewDoctorRequests />} />
      <Route path="/packages/*" element={<Packages />} />
      <Route path='/updatePassword' element = {<UpdatePassword/>} />


    </Routes>
  );
}

function AdminHome() {
  const id = '652b5385daaac6a3807ee5c7'
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <div>
          <a href="/admin/addAdmin" rel="noopener noreferrer">
            <button className="btn btn-primary"> Add Admin </button>
          </a>
        </div>
        <div>
          <Link to="/admin/users" style={{ textDecoration: 'none' }}>
            <button className="btn btn-primary"> View Users </button>
          </Link>
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
          <Link to={`/admin/updatePassword/`} style={{ textDecoration: 'none' }}>
            <button className="btn btn-primary"> Update my Password </button>
          </Link>
        </div>
      </header>
    </div>
  );
}

export default AdminPage; 