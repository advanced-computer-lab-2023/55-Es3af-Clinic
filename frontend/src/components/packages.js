import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import createPackage from "./createPackage";
import PackageServiceService from "../services/packageService";
function AdminPage() {
  return (
    <Routes>
      <Route path="/" element={<PackageHome />} />

      <Route path="/createPackage" element={<CreatePackage />} />

      <Route path="/listPackages" element={<ListPackages />} />







    </Routes>
  );
}

function PackageHome() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <a href="/package/createPackage" rel="noopener noreferrer">
            <button className="btn btn-primary"> Create Package </button>
          </a>
        </div>
        <div>
          <a href="/package/deletePackage" rel="noopener noreferrer">
            <button className="btn btn-primary"> Delete Package </button>
          </a>
        </div>
        <div>
          <a href="/package/listPackages" rel="noopener noreferrer">
            <button className="btn btn-primary"> View Packages </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default AdminPage; 