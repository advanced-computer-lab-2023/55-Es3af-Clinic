import http from "./http-common";

class AdminService {
  addAdmin(user) {
    return http.post("/admin/addAdmin", user);
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

  updatePassword(password){
    console.log('put is called')
    return http.put("/admin/updatePassword", {password: password})
  }

  getPassword(){
    return http.get("/admin/updatePassword")
  }
  acceptDoctorRequest(id) {
    return http.put(`/admin/acceptDoctorRequest/${id}`);
  }
  rejectDoctorRequest(id) {
    return http.put(`/admin/rejectDoctorRequest/${id}`);
  }
    
}

export default new AdminService();
