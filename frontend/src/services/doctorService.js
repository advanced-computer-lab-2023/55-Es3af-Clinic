import http from "./http-common";

class DoctorService {
    async getAllMyPatients(doctor) {
      return http.get("/doctor/getAllMyPatients",{params:{doctor}});
    }
    async updateDoctor(doctorId, updatedDoctorData) {
      return http.patch(`/doctor/updateDoctor?doctorId= ${doctorId}`, updatedDoctorData);
    }
    async selectPatient(doctorId, patientId) {
      return http.patch('/doctor/selectPatient',{params:{doctorId,patientId}})
    }
    
    async getAllPatients() {
      return http.get("/doctor/getPatients");
    }
}  

export default new DoctorService();