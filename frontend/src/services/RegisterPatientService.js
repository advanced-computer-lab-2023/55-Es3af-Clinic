import http from "./http-common";

class RegisterPatientService {
    
 registerPatient(patient) {
    return http.post("/register", patient);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new RegisterPatientService();