export default class SessionsRepository {

    constructor(dao){
        this.dao = dao;
    }

    getUsers = async(limit, page, query, sort) => {
        const users = await this.dao.getAll(limit, page, query, sort);
        return users;
    }


    updateRole = async(id, role) => {
        const result = await this.dao.updateRole(id, role);
        return result;
    }
}