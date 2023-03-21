import { Router } from 'express';
import Products from '../../dao/dbManager/products.js';
import Carts from '../../dao/dbManager/carts.js';

const productsManager = new Products();
const cartsManager = new Carts();
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
            styles:'css/home.css'
        });
    } catch (error) {
        res.render('error404',{});
    }
});



router.get('/product-detail', async (req, res) => {
    const { pid }  = req.query;
    try {
        const resp = await productsManager.getProductById(pid);
        const producto = resp.toObject();
        
        res.render('detalleProducto',{
            producto,
            styles:'css/detalleProducto.css'
        });
    } catch (error) {
        res.render('error404',{});
    }
});


router.get('/carts/:cid', async (req, res) => {
    const { cid }  = req.params;
    try {
        const resp = await cartsManager.getProductsCart(cid);
        const productsCart = resp.toObject();
        res.render('cart',{
            productsCart,
            styles:'../css/cart.css'
        });
    } catch (error) {
        res.render('error404',{});
    }
});



router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts',
    {
        styles:'css/realTimeProducts.css'
    });
});



router.get('/chat', (req, res) => {
    res.render('chat');
});



export default router;