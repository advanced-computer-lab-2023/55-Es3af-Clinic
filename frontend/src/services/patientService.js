import http from "./http-common";

class PatientService {
  viewDoctors(patient) {
      return http.get("/patient/viewDoctors",{params:{patient}});
    }
}  

export default new PatientService();