import http from "./http-common";

class PackageService {
    createPackage(pack) {
        return http.post("/packages/createPackage", pack);
      }
  updatePackages() {
  //return http.get("/packages/listPackages");
  }

   deletePackage(id) {
    return http.delete(`/packages/deletePackage/${id}`);
  }
  viewPackages(){
    return http.get("/packages");
  }

}

export default new PackageService();