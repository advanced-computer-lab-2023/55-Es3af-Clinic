import http from "./http-common";

class MemberService {
    getAll(){
        return http.get('/patient/familyMembers')
    }

    async addMember2 (member) {
        return http.post('/patient/addFamilyMember', member)
    }
}

export default new MemberService()
