import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import CreatePackage from "./createPackage";
import PackageServiceService from "../services/packageService";
function PackagePage() {
  return (
    <Routes>
      <Route path="/" element={<PackageHome />} />

      <Route path="/createPackage" element={<CreatePackage />} />

      {/* <Route path="/listPackages" element={<ListPackages />} /> */}







    </Routes>
  );
}

function AdminHome() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <a href="/admin/addAdmin" rel="noopener noreferrer">
            <button className="btn btn-primary"> create Package </button>
          </a>
        </div>
        <div>
          <a href="/admin/deleteUser" rel="noopener noreferrer">
            <button className="btn btn-primary"> Delete Package </button>
          </a>
        </div>
        <div>
          <a href="/admin/listUsers" rel="noopener noreferrer">
            <button className="btn btn-primary"> Update Package </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default PackagePage; 