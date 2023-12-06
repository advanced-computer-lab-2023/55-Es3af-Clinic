import http from "./http-common";

class RequestDoctorService {

  requestDoctor(requestDoctor,files) {
    return http.post("/requestDoctor", requestDoctor, files);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new RequestDoctorService();