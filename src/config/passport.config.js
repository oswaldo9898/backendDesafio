import passport from 'passport';
import local from 'passport-local';
import userModel from './../dao/models/users.model.js';
import { createHash, isValidPassword } from './../utils.js'
import GitHubStrategy from 'passport-github2';

const LocalStrategy = local.Strategy;

const initializePassport = () => {



    /**Passport para el registro de usuarios en el sistema */
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async(req, username, password, done) => {
        const {first_name, last_name, email, age} = req.body;
        try {
            const user = await userModel.findOne({email:username});
            if(user){
                console.log('el usuario ya existe');
                return done(null, false)
            }
            const newUser = {
                first_name,
                last_name, email,
                age,
                password: createHash(password)
            }
            const result = await userModel.create(newUser);
            return done(null, result);
        } catch (error) {
            return done(`Error al registrar usuario ${error}`)
        }
    }));



    /**Passport para el inicio de sesion de usuarios en el sistema */
    passport.use('login', new LocalStrategy({
        usernameField:'email'
    }, async(username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username });
            if(!user) {
                return done(null, false);
            }
            if(!isValidPassword(user, password)) {
                return done(null, false)
            }
            return done(null, user);
        } catch (error) {
            return done(`Error al logiar usuario ${error}`)
        }
    }));


     /**Passport para el inicio de sesion de usuarios con GitHub */
    passport.use('github', new GitHubStrategy({
        clientID:'Iv1.3ab6bede01b19eea',
        clientSecret:'29a58ea6258e2395b791e14f6e516b4e7a706cf6',
        callbackURL:'http://localhost:8080/api/sessions/github-callback'
    }, async(accessToken, refreshToken, profile, done) => {
        try {
            const user = await userModel.findOne({email: profile._json.email});
            if(!user) {
                const newUser ={
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email: profile._json.email,
                    password:''
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

export default initializePassport;