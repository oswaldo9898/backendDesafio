import { Router } from 'express';
import { adminAccess, adminPremiumAccess, privateAccess, publicAccess, userAccess } from '../../middlewares/authenticate.js';
import { administrar, administrarProducto, cart, chat, compraExitosa, current, loggerTest, login, mockingproducts, noFound, productDetail, productos, realtimeproducts, register, recuperarCuenta, cambiarPassword, administracionUsuarios, configuracion } from '../../controllers/views.controller.js';

const router = Router();


router.get('/register', publicAccess, register);
router.get('/login', publicAccess, login);
router.get('/', privateAccess, productos);
router.get('/recuperar-cuenta', publicAccess, recuperarCuenta);
router.get('/cambiar-password', publicAccess, cambiarPassword);

router.get('/current', current);
router.get('/productos', privateAccess, productos);
router.get('/product-detail', privateAccess, productDetail);
router.get('/carts/:cid', privateAccess, userAccess, cart);
router.get('/compra-exitosa', privateAccess, userAccess, compraExitosa);
router.get('/configuracion', privateAccess, configuracion);



router.get('/administrar', privateAccess, adminPremiumAccess, administrar);
router.get('/administrar-producto', privateAccess, adminPremiumAccess, administrarProducto);
router.get('/administracion-usuarios', privateAccess, adminPremiumAccess, administracionUsuarios);

router.get('/realtimeproducts', privateAccess, adminAccess, realtimeproducts);
router.get('/chat', privateAccess, userAccess, chat); 
router.get('/mockingproducts', privateAccess, adminAccess, mockingproducts);
router.get('/loggerTest', loggerTest);
//router.get('/*', noFound);

export default router;