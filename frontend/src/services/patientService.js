import http from "./http-common";

class PatientService {
  viewDoctors() {
      return http.get("/patient/viewDoctors");
    }
}  

export default new PatientService();