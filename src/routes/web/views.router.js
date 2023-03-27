import { Router } from 'express';
import Products from '../../dao/dbManager/products.js';
import Carts from '../../dao/dbManager/carts.js';

const productsManager = new Products();
const cartsManager = new Carts();
const router = Router();


const publicAccess = (req, res, next) => {
    if(req.session.user) return res.redirect('/productos');
    next();
}

const privateAccess = (req, res, next) => {
    if(!req.session.user) return res.redirect('/login');
    next();
}



router.get('/register', publicAccess, (req, res) => {
    res.render('register',{
        styles:'css/register.css'
    });
});

router.get('/login', publicAccess, (req, res) => {
    res.render('login',{
        styles:'css/login.css'
    });
});


router.get('/reset', publicAccess, (req, res) => {
    res.render('reset',{
        styles:'css/reset.css'
    });
});




router.get('/productos', privateAccess, async (req, res) => {
    const {limit, page, query, sort} = req.query;
    try {
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } = await productsManager.getAll(limit, page, query, sort);
        const arrayProducts = docs.map(product => product.toObject());
        
        
        res.render('products',{
            user: req.session.user,
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



router.get('/product-detail',privateAccess, async (req, res) => {
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


router.get('/carts/:cid',privateAccess, async (req, res) => {
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



router.get('/realtimeproducts',privateAccess, (req, res) => {
    res.render('realTimeProducts',
    {
        styles:'css/realTimeProducts.css'
    });
});



router.get('/chat', privateAccess,(req, res) => {
    res.render('chat');
});



export default router;