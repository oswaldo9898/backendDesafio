export default class SessionsRepository {
    constructor(dao){
        this.dao = dao;
    }

    resetPassword = async(email, password) => {
        const resp = this.dao.reset(email, password);
        return resp
    }
}