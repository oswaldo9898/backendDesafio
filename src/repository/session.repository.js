export default class SessionsRepository {

    constructor(dao){
        this.dao = dao;
    }

    recuperarCuenta = async(email) => {
        const resp = this.dao.recuperarCuenta(email);
        return resp
    }


    cambiarPassword = async(email, passwordNew) => {
        const resp = this.dao.cambiarPassword(email, passwordNew);
        return resp
    }
}