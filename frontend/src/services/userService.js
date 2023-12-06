import http from "./http-common";

class UserService {
  updatePassword(id, password, type) {
    if (type === "patient") {
      return http.put(`/patient/${id}/updatePassword`, { password: password });
    } else if (type === "doctor") {
      return http.put(`/doctor/${id}/updatePassword`, { password: password });
    }
  }

  getPassword(id, type) {
    if (type === "patient") {
      return http.get(`/patient/${id}/getPassword`);
    } else if (type === "doctor") {
      return http.get(`/doctor/${id}/getPassword`);
    }
  }

  login(user) {
    console.log(user);
    return http.post("/login", user);
  }

  logout() {
    return http.get("/logout");
  }

  forgetPassword(user) {
    return http.post("/forgetPassword", user);
  }

  updatePassword(password, type){
    return http.put(`/${type}/updatePassword`, password)
  }

  resetPassword(user, id){
    return http.put(`/resetPassword/${id}`, user);
  }
}

export default new UserService();
