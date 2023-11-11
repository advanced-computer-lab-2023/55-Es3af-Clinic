import http from "./http-common";

class PackageService {
  createPackage(pack) {
    return http.post("/packages/createPackage", pack);
  }

  updatePackage(pack) {
    return http.put("/packages/updatePackage", pack);
  }

  deletePackage(pack) {
    return http.delete("/packages/deletePackage", pack);
  }

  viewPackages() {
    return http.get("/packages");
  }
}

const packageService = new PackageService(); 

export default packageService; 
