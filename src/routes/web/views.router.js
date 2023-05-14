import { Router } from 'express';
import { adminAccess, privateAccess, publicAccess, userAccess } from '../../middlewares/authenticate.js';
import { administrar, administrarProducto, cart, chat, compraExitosa, current, login, mockingproducts, productDetail, productos, realtimeproducts, register, reset } from '../../controllers/views.controller.js';

const router = Router();


router.get('/register', publicAccess, register);
router.get('/login', publicAccess, login);
router.get('/reset', publicAccess, reset);
router.get('/current', current);
router.get('/productos', privateAccess, productos);
router.get('/product-detail', privateAccess, productDetail);
router.get('/carts/:cid', privateAccess, userAccess, cart);
router.get('/compra-exitosa', privateAccess, userAccess, compraExitosa);
router.get('/administrar', privateAccess, adminAccess, administrar);
router.get('/administrar-producto', privateAccess, adminAccess, administrarProducto);
router.get('/realtimeproducts', privateAccess, adminAccess, realtimeproducts);
router.get('/chat', privateAccess, userAccess, chat); 
router.get('/mockingproducts', privateAccess, adminAccess, mockingproducts);

export default router;