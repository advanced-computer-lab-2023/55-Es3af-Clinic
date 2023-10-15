import http from "./http-common";

class DoctorService {
    async getAllMyPatients(doctor) {
      return http.get("/doctor/getAllMyPatients",{params:{doctor}});
    }
    async updateDoctor(doctorId, updatedDoctorData) {
      return http.put(`/doctor/updateDoctor?doctorId=${doctorId}`, null, {
        data: updatedDoctorData,
      });
    }
    
    async selectPatient(doctorId, patientId) {
      return http.patch('/doctor/selectPatient',{params:{doctorId,patientUser:patientId}})
    }
    
    async getAllPatients() {
      return http.get("/doctor/getPatients");
    }
    FilteredAppointments(doctorid, date, status) {
      const queryParams = {};
  
      if (date) {
        queryParams.date = date;
      }
      if (status) {
        queryParams.status = status;
      }
  
      return http.get(`/doctor/filterAppointmentsByDateAndStatus/${doctorid}`, {
        params: queryParams,
      });
    }
    async SearchPatientByName(name) {
      return http.get(`/doctor/searchPatientByName?name=${name}`);
    }
    
}  

export default new DoctorService();