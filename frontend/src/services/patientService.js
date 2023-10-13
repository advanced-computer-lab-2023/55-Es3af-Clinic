import http from "./http-common";

class patientService {
    getAll() {
      return http.get("/patient/patients");
    }
}  

export default new memberService()