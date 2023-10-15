import http from "./http-common";

class PatientService {

  search(name, spec){
      console.log('search in service before get')
      return http.get(`http://localhost:8000/patient/search?name=${name}&speciality=${spec}`)
    }

  viewDoctors(patient) {
      return http.get("/patient/viewDoctors",{params:{patient}});
  }
  viewDocInfo(id){
    return http.get(`/patient/doctorInfo/${id}`)
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
  FilterDoctors(patientid, date, speciality) {
    const queryParams = {};

    if (date) {
      queryParams.date = date;
    }
    if (speciality) {
      queryParams.speciality = speciality;
    }

    return http.get(`/patient/filterAppointmentsByDateAndStatus/${patientid}`, {
      params: queryParams,
    });
    
  }
  
}


export default new PatientService();