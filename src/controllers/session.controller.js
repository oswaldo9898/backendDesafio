import * as sessionsService from './../services/session.service.js';
import CurrentDto from '../dao/DTOs/current.dto.js';


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
        role: req.user.role,
    }

    if(req.user.role !== 'admin'){
        req.session.user.documents = req.user.documents;
    }

    const accessToken = sessionsService.login(req.user);

    res.cookie('coderCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true })
        .send({ status: 'success', message: 'login success' });
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
        const token = await sessionsService.recuperarCuenta(email);
        if (token != null) {
            return res.send({ status: 'success', message: 'Reset success', token });
        } else {
            return res.status(404).send({ status: 'Error', message: 'Los datos ingresados no existen' });
        }
    } catch (error) {
        req.logger.error(error);
        return res.status(401).send({ status: 'error', error });
    }
};





const cambiarPassword = async (req, res) => {
    const token = req.params.token;
    const { passwordNew } = req.body;

    try {
        const resp = await sessionsService.cambiarPassword(token, passwordNew);
        return res.send(resp);
    } catch (error) {
        req.logger.error(error);
        return res.status(401).send({ status: 'error', error });
    }
}




const logout = (req, res) => {
    try {
        if(req.session.user.role !== 'admin'){
            let id = req.session.user.id;
            sessionsService.logout(id);
        }
        
        req.session.destroy(err => {
            if (err) return res.status(401).send({ status: 'error', error: 'no se pudo hacer el logout' });
            res.redirect('/login');
        });
    } catch (error) {
        req.logger.error(error);
        return res.status(401).send({ status: 'error', error });
    }
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