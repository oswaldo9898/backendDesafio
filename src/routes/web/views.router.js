import { Router } from 'express';
import Products from '../../dao/dbManager/products.js';
import Carts from '../../dao/dbManager/carts.js';

const productsManager = new Products();
const cartsManager = new Carts();
const router = Router();


const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect('/productos');
    next();
}

const privateAccess = (req, res, next) => {
    if (!req.session.user) return res.redirect('/login');
    next();
}


const adminAccess = (req, res, next) => {
    if (req.session.user.role !== 'admin') return res.redirect('/productos');
    next();
}



router.get('/register', publicAccess, (req, res) => {
    res.render('register', {
        title: 'Crear un cuenta',
        styles: 'css/register.css'
    });
});

router.get('/login', publicAccess, (req, res) => {
    res.render('login', {
        title: 'Inicio de sesión',
        styles: 'css/login.css'
    });
});


router.get('/reset', publicAccess, (req, res) => {
    res.render('reset', {
            title: 'Cambiar contraseña',
            styles: 'css/reset.css'
    });
});




router.get('/productos', privateAccess, async (req, res) => {
    const { limit, page, query, sort } = req.query;
    try {
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } = await productsManager.getAll(limit, page, query, sort);
        const arrayProducts = docs.map(product => product.toObject());


        res.render('products', {
            title: 'Tienda online',
            user: req.session.user,
            arrayProducts,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage,
            totalPages,
            styles: 'css/home.css'
        });
    } catch (error) {
        res.render('error404', {});
    }
});



router.get('/product-detail', privateAccess, async (req, res) => {
    const { pid } = req.query;
    const user = {};
    try {
        const resp = await productsManager.getProductById(pid);
        const producto = resp.toObject();

        res.render('detalleProducto', {
            title: producto.title,
            producto,
            user: req.session.user,
            styles: 'css/detalleProducto.css'
        });
    } catch (error) {
        res.render('error404', {});
    }
});


router.get('/carts/:cid', privateAccess, async (req, res) => {
    const { cid } = req.params;
    try {
        const resp = await cartsManager.getProductsCart(cid);
        const productsCart = resp.toObject();
        res.render('cart', {
            title: 'Carrito de compras',
            user: req.session.user,
            productsCart,
            styles: '../css/cart.css'
        });
    } catch (error) {
        res.render('error404', {});
    }
});


router.get('/administracion', privateAccess, adminAccess, async (req, res) => {
    const { limit, page, query, sort } = req.query;
    try {
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } = await productsManager.getAll(limit, page, query, sort);
        const arrayProducts = docs.map(product => product.toObject());

        res.render('administracion', {
            title: 'Administración',
            user: req.session.user,
            arrayProducts,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage,
            totalPages,
            styles: '../css/administracion.css'
        });
    } catch (error) {
        console.log(error)
        res.render('error404', {});
    }
});


router.get('/administrar-producto', privateAccess, adminAccess, async (req, res) => {
    try {
        res.render('administrarProducto', {
            title: 'Producto',
            user: req.session.user,
            styles: '../css/administrarProducto.css'
        });
    } catch (error) {
        console.log(error)
        res.render('error404', {});
    }
});



router.get('/realtimeproducts', privateAccess, (req, res) => {
    res.render('realTimeProducts',
        {
            title: 'Chat en linea',
            styles: 'css/realTimeProducts.css'
        });
});



router.get('/chat', privateAccess, (req, res) => {
    res.render('chat');
});



export default router;