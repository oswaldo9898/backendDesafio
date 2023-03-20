import { Router } from 'express';
import Products from '../../dao/dbManager/products.js';

const productsManager = new Products();
const router = Router();


router.get('/products', async (req, res) => {
    const {limit, page, query, sort} = req.query;
    try {
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } = await productsManager.getAll(limit, page, query, sort);
        const arrayProducts = docs.map(product => product.toObject());
        
        
        res.render('home',{
            arrayProducts,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage,
            totalPages,
            styles:'home.css'
        });
    } catch (error) {
        res.render('error404',{});
    }
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