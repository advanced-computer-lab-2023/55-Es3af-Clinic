import http from "./http-common";

class PatientService {
  search(name, spec) {
    console.log("search in service before get");
    return http.get(
      `http://localhost:8000/patient/search?name=${name}&speciality=${spec}`
    );
  }
  getPatient(id){
    return http.get(`/patient/${id}`);
  }
  async createSession(body){
    return http.post("/patient/createSession", body)
  }

  //de btshtaghal b ID 3ady bas ana mesameyah username
  async getAmountInWallet(){
    return http.get(`/patient/getAmountInWallet`)
  }
  async withdrawFromWallet(body){
    return http.put("/patient/widrawFromWallet",body)
  }
  async subscribeToAHealthPackage(info){
    return http.put("/patient/subscribeToAHealthPackage",info)
  }
  viewDoctors(patient) {
    return http.get("/patient/viewDoctors", { params: { patient } });
  }
  viewDocInfo(id) {
    return http.get(`/patient/doctorInfo/${id}`);
  }
  viewPrescriptions(id) {
    return http.get(`/patient/viewPrescriptions/${id}`);
  }

  FilteredPrescriptionList(patientid, date, doctor, status) {
    const queryParams = {};

    if (date) {
      queryParams.date = date;
    }
    if (doctor) {
      queryParams.doctor = doctor;
    }
    if (status) {
      queryParams.status = status;
    }

    return http.get(
      `/patient/filterprescriptionsbydatestatusdoctor/${patientid}`,
      {
        params: queryParams,
      }
    );
  }

  FilteredAppointmentsList(patientid, date, status) {
    const queryParams = {};

    if (date) {
      queryParams.date = date;
    }
    if (status) {
      queryParams.status = status;
    }

    return http.get(`/patient/filterAppointmentsByDateAndStatus/${patientid}`, {
      params: queryParams,
    });
  }
  FilterDoctors(date, speciality) {
    const queryParams = {};

    if (date) {
      queryParams.date = date;
    }
    if (speciality) {
      queryParams.speciality = speciality;
    }

    return http.get(`/patient/searchBySpecDate`, {
      params: queryParams,
    });
  }

  // getAllSpecialities(){
  //   return http.get('/patient')
  // }

  updatePassword(id, password){
    console.log('put is called')
    return http.put(`/patient/${id}/updatePassword`, {password: password})
  }

  getPassword(id){
    return http.get(`/patient/${id}/updatePassword`)
  }
  BookAnAppointment(id){

    return http.post(`/patient/BookAnAppointment/${id}`)
  }
  viewSubscribedHealthPackages(id) {
    return http.get(`/patient/viewSubscribedHealthPackages/${id}`);
  }
  viewPatientsAppointments(id) {
    return http.get(`/patient/viewPatientAppointments/${id}`);
  }
}

export default new PatientService();
