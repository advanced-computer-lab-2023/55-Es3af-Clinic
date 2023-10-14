import http from "./http-common";

class AdminService {
    addAdmin(user) {
        return http.post("/admin/addAdmin", user);
      }

  listUsers() {
    return http.get("/admin/listUsers");
  }

  deleteUser(id) {
    return http.delete(`/user/${id}`);
  }

  viewDoctorData() {
    return http.get("/admin/viewDoctorData");
  }
}

export default new AdminService();