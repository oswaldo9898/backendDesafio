import  userModel  from "../models/users.model.js";

export default class Users {

    constructor(){}


    getAll = async(limit=10, page=1, query='', sort='') => {
        const users = await userModel.paginate({last_name: {$regex: query}},{limit:limit, page:page})
        return users;
    }


    updateRole = async(id, role) => {
        const result = await userModel.findByIdAndUpdate({ _id: id }, {role});
        return result;
    }


}