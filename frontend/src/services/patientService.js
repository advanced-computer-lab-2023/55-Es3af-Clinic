import http from "./http-common";

class PatientService {
  viewDoctors(patient) {
      return http.get("/patient/viewDoctors",{params:{patient}});
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

    return http.get(`/patient/filterprescriptionsbydatestatusdoctor/${patientid}`, {
      params: queryParams,
    });
  }
}


export default new PatientService();