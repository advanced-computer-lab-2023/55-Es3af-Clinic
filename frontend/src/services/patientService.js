import http from "./http-common";

class PatientService {
  viewDoctors(patient) {
      return http.get("/patient/viewDoctors",{params:{patient}});
  }
  viewDocInfo(id){
    return http.get(`/patient/doctorInfo/${id}`)
  }
  viewPrescriptions(id) {
    return http.get(`/patient/viewPrescriptions/${id}`);
  }
  search(name, spec){
    console.log('search in service before get')
    return http.get(`http://localhost:8000/patient/search?name=${name}&speciality=${spec}`)
  }
}



export default new PatientService();