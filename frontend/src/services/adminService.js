import http from "./http-common";

class AdminService {
    addAdmin(user) {
        return http.post("/admin/addAdmin", user);
      }

  listUsers() {
    return http.get("/admin/listUsers");
  }

  deleteUser(id) {
    console.log("manga")
    console.log(id)
    return http.delete(`/admin/deleteUser/${id}`);
  }

  viewDoctorData() {
    return http.get("/admin/viewDoctorData");
  }
}

export default new AdminService();