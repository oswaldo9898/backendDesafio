import { decodeToken, generateToken } from '../utils.js';
import Sessions from "../dao/dbManager/session.js"
import SessionsRepository from '../repository/session.repository.js';
import { sendEmailResetPassword } from '../utils/sendEmail/index.js';
import Users from "../dao/dbManager/users.js"
import UsersRepository from '../repository/users.repository.js';

const sessionsManager = new Sessions();
const sessionsRepository = new SessionsRepository(sessionsManager);

const usersManager = new Users();
const usersRepository = new UsersRepository(usersManager);



/** Inicio de sesión en el sistema */
const login = async (user) => {

    const userConnect = {
        first_name: user.first_name,
        last_name: user.last_name,
        age: user.age,
        email: user.email,
        cart: user.cart,
        role: user.role
    }

    if (user.role !== 'admin') {
        usersRepository.updateLast_connection(user._id);
    }
    const accessToken = generateToken(userConnect);
    return accessToken;
};




const recuperarCuenta = async (email) => {

    const token = await sessionsRepository.recuperarCuenta(email);
    if (token) {
        sendEmailResetPassword(email, token);
        return token;
    } else {
        return null;
    }

};





const cambiarPassword = async (token, passwordNew) => {
    let payload = decodeToken(token);

    if (!payload) return { status: 'error', message: 'Token invalido. El token ha expirado, por favor cree uno nuevo' };

    const resp = await sessionsRepository.cambiarPassword(payload.user.email, passwordNew);
    if (!resp) return { status: 'error', message: 'La contraseña que esta intentando ingresar ya esta registrada' };

    return { status: 'success', message: 'Password cambiada exitosamente' };
}




const logout = (id) => {
    usersRepository.updateLast_connection(id);
};



export {
    login,
    recuperarCuenta,
    cambiarPassword,
    logout,
};