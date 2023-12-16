import http from "./http-common";
import axios from "axios";
//import jwt from 'jsonwebtoken'

class PatientService {
  search(name, spec) {
    console.log("search in service before get");
    return http.get(
      `http://localhost:8000/patient/search?name=${name}&speciality=${spec}`
    );
  }
  getPatient() {
    return http.get("/patient/getPatient");
  }
  async createSession(body) {
    return http.post("/patient/createSession", body);
  }
  AvailableAppointments(id) {
    return http.get(`patient/viewAvailableAppointments/${id}`);
  }

  //de btshtaghal b ID 3ady bas ana mesameyah username
  async getAmountInWallet() {
    return http.get("/patient/getAmountInWallet");
  }
  async withdrawFromWallet(body) {
    return http.put("/patient/withdrawFromWallet", body);
  }
  async subscribeToAHealthPackage(info) {
    return http.put("/patient/subscribeToAHealthPackage", info);
  }
  viewDoctors() {
    return http.get("/patient/viewDoctors");
  }
  viewDocInfo(id) {
    return http.get(`/patient/doctorInfo/${id}`);
  }
  viewPrescriptions() {
    return http.get(`/patient/viewPrescriptions`);
  }

  FilteredPrescriptionList(date, doctor, status) {
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

    return http.get(`/patient/filterprescriptionsbydatestatusdoctor`, {
      params: queryParams,
    });
  }

  FilteredAppointmentsList(date, status) {
    const queryParams = {};

    if (date) {
      queryParams.date = date;
    }
    if (status) {
      queryParams.status = status;
    }

    return http.get(`/patient/filterAppointmentsByDateAndStatus`, {
      params: queryParams,
    });
  }
  FilterDoctors(date, speciality) {
    const queryParams = {};

    if (date != "") {
      queryParams.date = date;
    }
    if (speciality != "") {
      queryParams.speciality = speciality;
    }

    return http.get(`/patient/searchBySpecDate`, {
      params: queryParams,
    });
  }

  // getAllSpecialities(){
  //   return http.get('/patient')
  // }

  BookAnAppointment(body) {
    return http.post("/patient/BookAnAppointment/", body);
  }
  viewSubscribedHealthPackages() {
    return http.get("/patient/viewSubscribedHealthPackages");
  }

  cancelPackageSubscirption(body) {
    return http.put(`/patient/cancelHealthPackageSubscription`, body);
  }

  viewPatientsAppointments() {
    return http.get("/patient/viewPatientAppointments");
  }
  viewMedicalHistory() {
    return http.get("/patient/viewMedicalHistory");
  }
  async removeMedicalHistory(medicalHistoryId) {
    return http.delete(`/patient/removeMedicalHistory/${medicalHistoryId}`);
  }
  async viewFamilyMembersAppointments() {
    return http.get("/patient/viewFamilyMembersAppointments");
  }
  async requestFollowUp(body) {
    return http.post("/patient/requestFollowUp", body);
  }
  async cancelAppointment(body) {
    return http.put("/patient/cancelAppointment", body);
  }
  async rescheduleAnAppointment(body) {
    return http.put("/patient/rescheduleAnAppointment", body);
  }
  async payForPres(presID) {
    return http.patch(`/patient/payUsingWallet/${presID}`);
  }
}

export default new PatientService();
