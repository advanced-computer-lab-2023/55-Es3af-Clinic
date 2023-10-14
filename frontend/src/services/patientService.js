import http from "./http-common";

class PatientService {
  viewDoctors(patient) {
      return http.get("/patient/viewDoctors",{params:{patient}});
  }
  viewDocInfo(id){
    return http.get(`/patient/doctorInfo/${id}`)
  }
}

export default new PatientService();