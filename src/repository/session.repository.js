export default class SessionsRepository {
    constructor(dao){
        this.dao = dao;
    }

    resetPassword = async() => {
        const resp = this.dao.reset(email, password);
        return resp
    }
}