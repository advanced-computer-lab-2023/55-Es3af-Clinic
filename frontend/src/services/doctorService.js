import http from "./http-common";

class DoctorService {
    getAllMyPatients(doctorId) {
      return http.get("/doctor/getAllMyPatients",{params:{doctorId}});
    }
}  

export default new DoctorService();