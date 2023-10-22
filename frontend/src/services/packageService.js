import http from "./http-common";

class PackageService {
    createPackage(pack) {
        return http.post("/packages/createPackage", pack);
      }
  updatePackages() {
<<<<<<< HEAD
  //return http.get("/packages/listPackages");
  }

   deletePackage(id) {
    return http.delete(`/packages/deletePackage/${id}`);
  }
  viewPackages(){
    return http.get("/packages");
=======
  return http.get("/packages/listPackages");
  }

  deletePackage(pack) {
  return http.delete(`/packages/deletePackage`, pack);
>>>>>>> c763c4f (old changes from sprint #1)
  }

}

export default new PackageService();