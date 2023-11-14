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
  async FilteredAppointments(date, status) {
    const queryParams = {};

    if (date) {
      queryParams.date = date;
    }
    if (status) {
      queryParams.status = status;
    }

    return http.get("/doctor/filterAppointmentsByDateAndStatus", {
      params: queryParams,
    });
  }
  async SearchPatientByName(name) {
    return http.get(`/doctor/searchPatientByName?name=${name}`);
  }

  filterPatient(inputDate) {
    return http.get(
      `/doctor/filterPatientsByUpcomingPendingAppointments?date=${inputDate}`
    );
  }

  updatePassword(password){
    console.log('put is called')
    return http.put("/doctor/updatePassword", {password: password})
  }

  getPassword(){
    return http.get(`/doctor/updatePassword`)
  }
  async getTimeSlots() {
    try {
      const response = await http.get("/doctor/getTimeSlots");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  async addTimeSlots(timeSlotsData) {
    try {
      const response = await http.post("/doctor/addTimeSlots", timeSlotsData, {
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