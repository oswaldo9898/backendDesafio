export default class SessionsRepository {

    constructor(dao){
        this.dao = dao;
    }

    getUsers = async(limit, page, query, sort) => {
        const users = await this.dao.getAll(limit, page, query, sort);
        return users;
    }


    getAllUsers = async() => {
        const users = await this.dao.getAllUsers();
        return users;
    }


    getUser = async(id) => {
        const users = await this.dao.getUser(id);
        return users;
    }


    updateRole = async(id, role) => {
        const result = await this.dao.updateRole(id, role);
        return result;
    }


    updateLast_connection = async(id) => {
        const last_connection = new Date;
        const result = await this.dao.updateLast_connection(id, last_connection);
        return result;
    }


    saveDocument = async(id, document) => {
        const result = await this.dao.saveDocument(id, document);
        return result;
    }


    deleteUser = async(id) => {
        const result = await this.dao.deleteUser(id);
        return result;
    }

}