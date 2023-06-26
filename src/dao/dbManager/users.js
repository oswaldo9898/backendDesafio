import  userModel  from "../models/users.model.js";

export default class Users {

    constructor(){}


    getAll = async(limit=10, page=1, query='', sort='') => {
        const users = await userModel.paginate({last_name: {$regex: query}},{limit:limit, page:page})
        return users;
    }


    getUser = async(id) => {
        let user = await userModel.findOne({ _id: id });
        return user;
    }


    updateRole = async(id, role) => {
        const result = await userModel.findByIdAndUpdate({ _id: id }, {role});
        return result;
    }


    updateLast_connection = async(id, last_connection) => {
        const result = await userModel.findByIdAndUpdate({ _id: id }, {last_connection});
        return result;
    }


    saveDocument = async(id, document) => {
        const result = await userModel.findByIdAndUpdate({ _id: id }, { $push: { documents: { "name": document.name, "reference": document.reference}}});
        return result;
    }

}