import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from './config/config.js';

// export const PRIVATE_KEY = 'CoderSecret'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const privateKey = config.privateKey;

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const generateToken = (user) => {
    const token = jwt.sign({ user }, privateKey, { expiresIn: '24h' });
    return token;
};


//CUSTOM CALL
export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(error);
            
            if (!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
            }

            req.user = user;
            next();
        })(req, res, next);
    }
}

export const authorization = (rol) => {
    return async(req, res, next) => {
        console.log(req.user);
        if(req.user.rol!=rol) return res.status(403).send({ error: 'Not permissions' });
        next();
    }
}


export default  __dirname ;

