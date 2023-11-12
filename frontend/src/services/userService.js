import http from "./http-common";

class UserService{
    updatePassword(id, password, type){
        if(type == 'patient'){
            return http.put(`/patient/${id}/updatePassword`, {password: password})
        } else if (type == 'doctor'){
            return http.put(`/doctor/${id}/updatePassword`, {password: password})
        }

    }

    getPassword(id, type){
        if(type == 'patient'){
            return http.get(`/patient/${id}/updatePassword`)
        }else if(type == 'doctor'){
            return http.get(`/doctor/${id}/updatePassword`)
        }
        
    }
}

export default new UserService()