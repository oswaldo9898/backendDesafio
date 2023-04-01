import {Router} from 'express';
import userModel from './../../dao/models/users.model.js';
import { createHash, isValidPassword } from './../../utils.js';
import passport from 'passport';

const router = Router();


/** Registro de un nuevo usuario en el sistema */
router.post('/register', passport.authenticate('register', {failureRedirect: 'fail-register'}), async(req, res) => {
    res.send({status:'success', message:'user registered'});
});


router.get('/fail-register', async(req, res) => {
    res.send({status:'error', message:'No se puedo registrar'})
})




/** Inicio de sesión en el sistema */
router.post('/login', passport.authenticate('login', {failureRedirect: 'fail-login'}), async(req, res) => {
    if(!req.user) return res.status(400).send({status:'error', message:'inavlided credencial'});
    let rol = 'usuario'
    if(req.user.email.substring(0,5) === 'admin') rol = 'admin'

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        rol
    }

    res.send({status:'success', message:'login success'})
});

router.get('/fail-login', async (req, res) => {
    res.send({ status: 'error', message: 'login failed' });
});



/** Inicio de sesión con autenticación de terceros GitHub */
router.get('/github', passport.authenticate('github', {scope: ['user:email']}), async(req, res) => {
    res.send({stattus:'success', message:'user registered'});
});

router.get('/github-callback',  passport.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
    let rol = 'usuario'
    req.user.rol = rol;
    req.session.user = req.user;
    res.redirect('/productos')
})






router.post('/reset', async(req, res) => {
    const {  email, password } = req.body;

    if(!email || !password) return res.status(400).send({status:'error', message:'incomplete values'});

    try {
        const user = await userModel.findOne({ email });

        if(!user) return res.status(404).send({status:'error', message:'user not found'});

        user.password = createHash(password);

        await userModel.updateOne({ email }, user)

        return res.send({status:'success', message:'Reset success'});
    } catch (error) {
        console.log(error);
        return res.status(500).send({status:'error', error});
    }
});



router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).send({status:'error', error:'no se pudo hacer el logout'});
        res.redirect('/login');
    })
});

export default router;