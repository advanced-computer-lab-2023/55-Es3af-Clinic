import http from "./http-common";

class PackageService {
  createPackage(packageData) {
    return http.post("/packages/createPackage", packageData);
  }

  listPackages() {
    return http.get("/packages/listPackages");
  }

  deletePackage(id) {
    return http.delete(`/packages/deletePackage/${id}`);
  }
}

export default new PackageService();
