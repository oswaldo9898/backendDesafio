import {Router} from 'express';
import userModel from './../../dao/models/users.model.js';
import { createHash, isValidPassword } from './../../utils.js';

const router = Router();

router.post('/register', async(req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        const exists = await userModel.findOne({email});
        if(exists) return res.status(400).send({status:'error', error:'user already exists'});

        
        const user = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password)
        };
        await userModel.create(user);
        return res.send({status:'success', message:'user registered'});
    } catch (error) {
        console.log(error);
        return res.status(500).send({status:'error', error});
    }
});



router.post('/login', async(req, res) => {
    const {  email, password } = req.body;

    if(!email || !password) return res.status(400).send({status:'error', message:'incomplete values'});

    try {
        const user = await userModel.findOne({ email });

        if(!user) return res.status(404).send({status:'error', message:'user not found'});

        if(!isValidPassword(user, password)) return res.status(401).send({status:'error', message:'invalid credentials'});

        user.rol = 'usuario'

        if(user.email.substring(0,5) === 'admin') user.rol = 'admin'

        delete user.password;

        req.session.user = user;

        return res.send({status:'success', message:'login success'});
    } catch (error) {
        console.log(error);
        return res.status(500).send({status:'error', error});
    }
});




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