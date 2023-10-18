import http from "./http-common";

class PackageService {
    createPackage(pack) {
        return http.post("/packages/createPackage", pack);
      }
  updatePackages() {
  return http.get("/packages/listPackages");
  }

   deletePackage(id) {
    return http.delete(`/packages/deletePackage/${id}`);
  }

}

export default new PackageService();