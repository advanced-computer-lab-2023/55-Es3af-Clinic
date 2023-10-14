import http from "./http-common";

class DoctorService {
    getAllMyPatients(doctor) {
      return http.get("/doctor/getAllMyPatients",{params:{doctor}});
    }
}  

export default new DoctorService();