import http from "./http-common";

class DoctorService {
    getAllMyPatients(doctor) {
      return http.get("/doctor/getAllMyPatients",{params:{doctor}});
    }
    updateDoctor
}  

export default new DoctorService();