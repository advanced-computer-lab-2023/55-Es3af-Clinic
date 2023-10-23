import http from "./http-common";

class PackageService {
    createPackage(pack) {
        return http.post("/packages/createPackage", pack);
      }
  updatePackages() {
  return http.get("/packages/listPackages");
  }

  deletePackage(pack) {
  return http.delete(`/packages/deletePackage`, pack);
  }

}

export default new PackageService();