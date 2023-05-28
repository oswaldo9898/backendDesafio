import { createHash, generateToken, isValidPassword } from "../../utils.js";
import  userModel  from "../models/users.model.js";

export default class Users {

    constructor(){}


    recuperarCuenta = async(emailUser) => {
        const user = await userModel.findOne({ email: emailUser });
        if(!user) return null;

        const newUser = {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
        }

        let token = generateToken(newUser);
        return token;
    };


    cambiarPassword = async(email, passwordNew) => {
        const user = await userModel.findOne({ email });

        if(!user) return null;

        if(isValidPassword(user, passwordNew)) return null;

        let password = createHash(passwordNew);
        user.password = password;
        const resp =  await userModel.updateOne({ email }, user);        
        return resp;
    };

}