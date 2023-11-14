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
  getPatient(id) {
    return http.get(`/patient/${id}`);
  }
  async createSession(body) {
    return http.post("/patient/createSession", body);
  }

  //de btshtaghal b ID 3ady bas ana mesameyah username
  async getAmountInWallet() {
    return http.get("/patient/getAmountInWallet");
  }
  async withdrawFromWallet(body) {
    return http.put("/patient/widrawFromWallet", body);
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

    return http.get(
      `/patient/filterprescriptionsbydatestatusdoctor`,
      {
        params: queryParams,
      }
    );
  }

  FilteredAppointmentsList( date, status) {
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

  BookAnAppointment(id) {
    return http.post(`/patient/BookAnAppointment/${id}`);
  }
  viewSubscribedHealthPackages(id) {
    return http.get(`/patient/viewSubscribedHealthPackages/${id}`);
  }

  // cancelPackageSubscirption(id) {
  //   return http.put(`/patient/viewSubscribedHealthPackages/${id}`);
  // }

  viewPatientsAppointments() {
    return http.get("/patient/viewPatientAppointments");
  }

  // uploadMedicalHistory(formData){
  //   console.log('service')



  //   return axios.post('http://localhost:8000/patient/uploadMedicalHistory', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //       'Authorization': `Bearer ${authToken}`
  //     },
  //   })
    //http.put('/patient/uploadMedicalHistory', formData)
  //}

        //   await axios.put('http://localhost:8000/patient/uploadMedicalHistory', formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        // });


    uploadMedicalHistory = (formData) => {
      console.log(document.cookie)
      return axios.post('http://localhost:8000/patient/uploadMedicalHistory', formData
      //{
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     'Authorization': `Bearer ${authToken}`, // Include the token in the Authorization header
      //   },
      // }
      )
      .then((response) => {
        // Handle successful response
        return response.data;
      })
      .catch((error) => {
        // Handle errors
        throw error;
      });
  };
}

export default new PatientService();
