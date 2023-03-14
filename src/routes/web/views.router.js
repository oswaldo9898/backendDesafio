import { Router } from 'express';
import Products from '../../dao/dbManager/products.js';

const productsManager = new Products();
const router = Router();


router.get('/', async (req, res) => {
    const products = await productsManager.getAll();
    res.render('home',{
        products,
        styles:'home.css'
    });
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts',
    {
        styles:'realTimeProducts.css'
    });
});


router.get('/chat', (req, res) => {
    res.render('chat');
});



export default router;