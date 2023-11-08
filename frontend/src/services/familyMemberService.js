import http from "./http-common";

class MemberService {
    getAll(patient){
        return http.get('/patient/familyMembers', {params:{patient}})
    }
    async addMember(member,patient){
        return http.post(`/patient/${patient}/addFamilyMemberByAcc`,member)
    }
    async addMember2 (member, patientUser) {
        return http.post('/patient/addFamilyMember', member, {params:{patient:patientUser}})
    }
}

export default new MemberService()
