import passport from 'passport';
import local from 'passport-local';
import jwt from 'passport-jwt';
import userModel from './../dao/models/users.model.js';
import { createHash, isValidPassword } from './../utils.js'
import GitHubStrategy from 'passport-github2';
import Carts from "./../dao/dbManager/carts.js";
import config from './config.js';

const cartsManager = new Carts();
const LocalStrategy = local.Strategy;


const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const clientSecret = config.clientSecret;
const clientId = config.clientId;
const callbackUrl = config.callbackUrl;
const privateKey = config.privateKey;



const initializePassport = () => {

    /**Passport para el registro de usuarios en el sistema */
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async(req, username, password, done) => {
        const {first_name, last_name, email, age, role} = req.body;
        try {
            const user = await userModel.findOne({email:username});
            if(user){
                return done(null, false)
            }

            const cartsArr = await cartsManager.addCart();

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                cart:cartsArr._id.valueOf(),
                role
            }
            const result = await userModel.create(newUser);
            return done(null, result);
        } catch (error) {
            console.log(error)
            return done(`Error al registrar usuario ${error}`)
        }
    }));



    /**Passport para el inicio de sesion de usuarios en el sistema */
    passport.use('login', new LocalStrategy({
        usernameField:'email'
    }, async(username, password, done) => {
        try {
            let userAdmin = false;
            let user = await userModel.findOne({ email: username });

            if( username === config.adminEmail && password === config.adminPassword ){
                userAdmin = true;
            }
            
            if(!user && !userAdmin) return done(null, false);

            if(user){
                if(!isValidPassword(user, password)) return done(null, false);
            }else{
                user = {
                    first_name: 'SuperAdmin',
                    last_name: '',
                    age: 0,
                    email: config.adminEmail,
                    cart: null,
                    role: 'admin',
                    _id: Date.now()
                }
            }
            
            return done(null, user);

        } catch (error) {
            return done(`Error al logiar usuario ${error}`)
        }
    }));

    /**Passport  para la utilizacion de jwt con cookie*/
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: privateKey
    }, async (jwt_payload, done) => {
        try {
            // if (!jwt_payload.sadfsdf) return done(null, false, { messages: 'Atributo no encontrado' });
            return done(null, jwt_payload.user);
        } catch (error) {
            console.log(error)
            return done(error);
        }
    }))


     /**Passport para el inicio de sesion de usuarios con GitHub */
    passport.use('github', new GitHubStrategy({
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: callbackUrl
    }, async(accessToken, refreshToken, profile, done) => {
        try {
            const user = await userModel.findOne({first_name: profile._json.name});
            if(!user) {
                const cartsArr = await cartsManager.addCart();
                const newUser ={
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email: profile._json.login,
                    password:'',
                    cart:cartsArr._id.valueOf(),
                    role: 'user'
                }
                const result = await userModel.create(newUser);
                done(null, result)
            }else{
                done(null, user);
            }
        } catch (error) {
            done(error)
        }
    }))


    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser( async(id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    })
}

const cookieExtractor = req => {
    
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['coderCookieToken'];
    }
    return token;
}

export default initializePassport;