import userModel from '../dao/models/users.model.js';
import { createHash, decodeToken, generateToken } from '../utils.js';
import Sessions from "../dao/dbManager/session.js"
import SessionsRepository from '../repository/session.repository.js';
import CurrentDto from '../dao/DTOs/current.dto.js';
import { sendEmailResetPassword } from '../utils/sendEmail/index.js';

const sessionsManager = new Sessions();
const sessionsRepository = new SessionsRepository(sessionsManager);

/** Registro de un nuevo usuario en el sistema */
const register = async (req, res) => {
    res.send({ status: 'success', message: 'user registered' });
};


const failRegister = async (req, res) => {
    res.send({ status: 'error', message: 'No se puedo registrar' })
};



/** Inicio de sesión en el sistema */
const login = async (req, res) => {
    if (!req.user) return res.status(400).send({ status: 'error', message: 'invalided credencial' });

    req.session.user = {
        id: req.user._id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        cart: req.user.cart,
        role: req.user.role
    }

    const user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        cart: req.user.cart,
        role: req.user.role
    }

    const accessToken = generateToken(user);

    res.cookie('coderCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true })
        .send({ status: 'success', message: 'login success' })
};


const failLogin = async (req, res) => {
    res.status(401).send({ status: 'error', message: 'login failed' });
};


const current = (req, res) => {
    const currentDto = new CurrentDto(req.user)
    res.send({ status: 'success', payload: currentDto });
};



/** Inicio de sesión con autenticación de terceros GitHub */
const loginGithub = async (req, res) => {
    res.send({ stattus: 'success', message: 'user registered' });
};

const gitHubCallback = (req, res) => {
    let rol = 'usuario'
    req.user.rol = rol;
    req.session.user = req.user;
    res.redirect('/productos')
};


const recuperarCuenta = async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).send({ status: 'error', message: 'incomplete values' });
    try {
        const token = await sessionsRepository.recuperarCuenta(email);
        if (token) {
            await sendEmailResetPassword(email, token);
            return res.send({ status: 'success', message: 'Reset success' });
        } else {
            return res.status(500).send({ status: 'error', message: 'Los datos ingresados no existen' });
        }
    } catch (error) {
        req.logger.error(error);
        console.log(error)
        return res.status(401).send({ status: 'error', error });
    }
};

const cambiarPassword = async (req, res) => {
    const token = req.params.token;
    const { passwordNew } = req.body;
    let payload = decodeToken(token);

    if (!payload) return res.status(401).send({ status: 'error', message: 'Token invalido. El token ha expirado, por favor cree uno nuevo' });

    const resp = await sessionsRepository.cambiarPassword(payload.user.email, passwordNew);

    if (!resp) return res.status(401).send({ status: 'error', message: 'La contraseña que esta intentando ingresar ya esta registrada' });

    return res.send({ message: 'succes' });
}




const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(401).send({ status: 'error', error: 'no se pudo hacer el logout' });
        res.redirect('/login');
    });
};



export {
    register,
    failRegister,
    login,
    failLogin,
    current,
    loginGithub,
    gitHubCallback,
    recuperarCuenta,
    cambiarPassword,
    logout,
};