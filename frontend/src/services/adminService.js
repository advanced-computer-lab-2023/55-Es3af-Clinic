import http from "./http-common";

class AdminService {
  addAdmin(username, password) {
    return http.post("/admin/addAdmin", { username, password });
  }

  listUsers() {
    return http.get("/admin/listUsers");
  }

  deleteUser(id) {
    return http.delete(`/admin/deleteUser/${id}`);
  }

  viewDoctorData() {
    return http.get("/admin/viewDoctorData");
  }
}

export default new AdminService();
