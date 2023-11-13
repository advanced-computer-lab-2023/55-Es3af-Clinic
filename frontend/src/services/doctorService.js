import http from "./http-common";

class DoctorService {
  async getAllMyPatients(doctor) {
    return http.get("/doctor/getAllMyPatients", { params: { doctor } });
  }
  async updateDoctor(doctor) {
    try {
      const token = localStorage.getItem('token');
    const response = await http.put("/doctor/updateDoctor", doctor, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
  }
  async getAmountInWallet(){
    return http.get("/doctor/getAmountInWallet")
  }

  // selectPatient(doctorId, patientId) {
  //   return http.patch('/doctor/selectPatient',{params:{doctorId,patientUser:patientId}})
  // }

  async getAllPatients() {
    return http.get("/doctor/getPatients");
  }
  async FilteredAppointments(doctorid, date, status) {
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

  filterPatient(doctorId, inputDate) {
    return http.get(
      `/doctor/filterPatientsByUpcomingPendingAppointments?Id=${doctorId}&date=${inputDate}`
    );
  }

  updatePassword(id, password){
    console.log('put is called')
    return http.put(`/doctor/${id}/updatePassword`, {password: password})
  }

  getPassword(id){
    return http.get(`/doctor/${id}/updatePassword`)
  }
  async getTimeSlots(doctorId) {
    try {
      const response = await http.get(`/doctor/getTimeSlots/${doctorId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  async addTimeSlots(id, timeSlotsData) {
    try {
      const response = await http.post(`/doctor/addTimeSlots/${id}`, timeSlotsData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new DoctorService();