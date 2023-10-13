import http from "./http-common";

class RequestDoctorService {

  requestDoctor(requestDoctor) {
    return http.post("/requestDoctor", requestDoctor);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new RequestDoctorService();