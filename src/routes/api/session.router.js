import {Router} from 'express';
import passport from 'passport';
import { current, failLogin, failRegister, gitHubCallback, login, loginGithub, logout, register, reset } from '../../controllers/session.controller.js';

const router = Router();


router.post('/register', passport.authenticate('register', {failureRedirect: 'fail-register'}), register);/** Registro de un nuevo usuario en el sistema */
router.get('/fail-register', failRegister);
router.post('/login', passport.authenticate('login', {failureRedirect: 'fail-login'}), login);/** Inicio de sesión en el sistema */
router.get('/fail-login', failLogin);
router.get('/current', passport.authenticate('jwt', { session: false }), current);
router.get('/github', passport.authenticate('github', {scope: ['user:email']}), loginGithub);/** Inicio de sesión con autenticación de terceros GitHub */
router.get('/github-callback',  passport.authenticate('github', {failureRedirect: '/login'}), gitHubCallback)
router.post('/reset', reset);
router.get('/logout', logout);


export default router;