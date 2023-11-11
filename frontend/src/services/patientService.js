import http from "./http-common";

class PatientService {
  search(name, spec) {
    console.log("search in service before get");
    return http.get(
      `http://localhost:8000/patient/search?name=${name}&speciality=${spec}`
    );
  }
  async getAmountInWallet(username){
    return http.get(`/patient/${username}/getAmountInWallet`)
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
  useDoctorSearch(patientid, date, speciality) {
    const queryParams = {};

    if (date) {
      queryParams.date = date;
    }
    if (speciality) {
      queryParams.speciality = speciality;
    }

    return http.get(`/patient/searchBySpecDate/${patientid}`, {
      params: queryParams,
    });
  }

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
}

export default new PatientService();
