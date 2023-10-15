import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import CreatePackage from "./createPackage";
//import PackageServiceService from "../services/packageService";
function PackagePage() {
  return (
    <Routes>
      <Route path="/" element={<PackageHome />} />

      <Route path="/createPackage" element={<CreatePackage />} />

      {/* <Route path="/listPackages" element={<ListPackages />} /> */}

    </Routes>
  );
}

function PackageHome() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <a href="/admin/packages/createPackage" rel="noopener noreferrer">
            <button className="btn btn-primary"> Add Package </button>
          </a>
        </div>
        <div>
          <a href="/admin/packages/deletePackage" rel="noopener noreferrer">
            <button className="btn btn-primary"> Delete Package </button>
          </a>
        </div>
        <div>
          <a href="/admin/packages/listPackages" rel="noopener noreferrer">
            <button className="btn btn-primary"> View Packages </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default PackagePage;