import http from "./http-common";

class memberService {
    getAll(){
        return http.get('/members')
    }

    async getMembers (member) {
        return http.post('/members/add', member)
    }
}

export default new memberService()