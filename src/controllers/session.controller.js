import userModel from '../dao/models/users.model.js';
import { createHash, generateToken } from '../utils.js';
import Users from "../dao/dbManager/users.js"
import SessionsRepository from '../repository/session.repository.js';
import CurrentDto from '../dao/DTOs/current.dto.js';

const usersManager = new Users();
const sessionsRepository = new SessionsRepository(usersManager);

/** Registro de un nuevo usuario en el sistema */
const register = async(req, res) => {
    res.send({status:'success', message:'user registered'});
};


const failRegister = async(req, res) => {
    res.send({status:'error', message:'No se puedo registrar'})
};



/** Inicio de sesión en el sistema */
const login = async(req, res) => {
    if(!req.user) return res.status(400).send({status:'error', message:'invalided credencial'});    

    req.session.user = {
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
    .send({status:'success', message:'login success'})
};


const failLogin = async (req, res) => {
    res.send({ status: 'error', message: 'login failed' });
};


const current = (req, res) => {
    const currentDto = new CurrentDto(req.user)
    res.send({ status: 'success', payload: currentDto });
};



/** Inicio de sesión con autenticación de terceros GitHub */
const loginGithub = async(req, res) => {
    res.send({stattus:'success', message:'user registered'});
};

const gitHubCallback = (req, res) => {
    let rol = 'usuario'
    req.user.rol = rol;
    req.session.user = req.user;
    res.redirect('/productos')
};


const reset = async(req, res) => {
    const {  email, password } = req.body;

    if(!email || !password) return res.status(400).send({status:'error', message:'incomplete values'});

    try {
        // const user = await userModel.findOne({ email });
        // if(!user) return res.status(404).send({status:'error', message:'user not found'});
        // user.password = createHash(password);
        // await userModel.updateOne({ email }, user)
        const resp = sessionsRepository.resetPassword(email, password);

        return res.send({status:'success', message:'Reset success'});
    } catch (error) {
        console.log(error);
        return res.status(500).send({status:'error', error});
    }
};



const logout = (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).send({status:'error', error:'no se pudo hacer el logout'});
        res.redirect('/login');
    })
};

export {
    register,
    failRegister,
    login,
    failLogin,
    current,
    loginGithub,
    gitHubCallback,
    reset,
    logout,
};