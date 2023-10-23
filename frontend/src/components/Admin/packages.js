import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import CreatePackage from "./createPackage";
import DeletePackage from "./deletePackage";
import PkgList from "../viewPackages"
// import PackageServiceService from "../services/packageService";
import UpdatePackage from "../updatePackage";
function PackagePage() {
  return (
    <Routes>
      <Route path="/" element={<PackageHome />} />

      <Route path="/createPackage" element={<CreatePackage />} />
      <Route path="/updatePackage" element={<UpdatePackage />} />

      <Route path="/deletePackage" element={<DeletePackage />} />
      
      <Route path="/listPackages" element={<PkgList />} />

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
          <a href="/admin/packages/updatePackages" rel="noopener noreferrer">
            <button className="btn btn-primary"> Update Packages </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default PackagePage;