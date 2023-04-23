import { createHash } from "../../utils.js";
import  userModel  from "../models/users.model.js";

export default class Users {

    constructor(){}

    reset = async(email, password) => {
        const user = await userModel.findOne({ email });
        if(!user) return res.status(404).send({status:'error', message:'user not found'});
        user.password = createHash(password);
        await userModel.updateOne({ email }, user);
    };

}