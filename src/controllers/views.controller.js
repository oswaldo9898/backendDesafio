import * as productsService from './../services/products.service.js';
import * as usersService from './../services/users.service.js';
import * as cartsService from './../services/carts.service.js';
import { generateProduct } from "../utils.js";




const register = async (req, res) => {
    res.render('register', {
        title: 'Crear un cuenta',
        styles: 'css/register.css'
    });
};


const login = async (req, res) => {
    res.render('login', {
        title: 'Inicio de sesión',
        styles: 'css/login.css'
    });
};


const recuperarCuenta = async (req, res) => {
    res.render('recuperarCuenta', {
        title: 'Recuperar cuenta'
    });
};


const cambiarPassword = async (req, res) => {
    res.render('cambiarPassword', {
        title: 'Cambiar Password'
    });
};


const current = async (req, res) => {
    res.render('current', {
        title: 'Current'
    });
};


const productos = async (req, res) => {
    const { limit, page, query, sort } = req.query;
    try {
        const { docs, page: actual, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } = await productsService.getProducts(limit, page, query, sort);
        const arrayProducts = docs.map(product => product.toObject());

        res.render('home', {
            title: 'Tienda online',
            user: req.session.user,
            arrayProducts,
            hasPrevPage,
            hasNextPage,
            nextPage,
            actual,
            prevPage,
            totalPages,
            styles: 'css/home.css'
        });
    } catch (error) {
        req.logger.error(error);
        res.render('error404', {});
    }
};


const productDetail = async (req, res) => {
    const { pid } = req.query;
    try {
        const resp = await productsService.getProduct(pid);
        const producto = resp.toObject();

        const prodRecom =  await productsService.getProductRecomend(producto.category);
        const arrayProdRecom = prodRecom.map(product => product.toObject());
        //const prodRecom = resProdRecom.toObject();

        res.render('detalleProducto', {
            title: producto.title,
            producto,
            arrayProdRecom,
            user: req.session.user,
            styles: 'css/detalleProducto.css'
        });
    } catch (error) {
        console.log(error)
        req.logger.error(error);
        res.render('error404', {});
    }
};


const cart = async (req, res) => {
    const { cid } = req.params;
    try {
        const resp = await cartsService.getProductsCart(cid);
        const productsCart = resp.toObject();
        res.render('cart', {
            title: 'Carrito de compras',
            user: req.session.user,
            productsCart,
            styles: '../css/cart.css'
        });
    } catch (error) {
        req.logger.error(error);
        res.render('error404', {});
    }
};


const compraExitosa = async (req, res) => {
    try {
        res.render('compraExitosa', {
            title: 'Compra exitosas',
            user: req.session.user,
        });
    } catch (error) {
        req.logger.error(error);
        res.render('error404', {});
    }
};

const configuracion = async (req, res) => {
    let uid= req.session.user.id
    try {
        let userDocuments = await usersService.getDocuments( uid );
        res.render('configuracion', {
            title: 'configuracion',
            user: req.session.user,
            documents: userDocuments.documents,
            styles: '../css/configuracion.css'
        });
    } catch (error) {
        req.logger.error(error);
        res.render('error404', {});
    }
};


const administrar = async (req, res) => {
    const { limit, page, query, sort } = req.query;
    try {
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } = await productsService.getProducts(limit, page, query, sort);
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
        req.logger.error(error);
        res.render('error404', {});
    }
};


const administrarProducto = async (req, res) => {
    try {
        res.render('administrarProducto', {
            title: 'Producto',
            user: req.session.user,
            styles: '../css/administrarProducto.css'
        });
    } catch (error) {
        req.logger.error(error);
        res.render('error404', {});
    }
};



const administracionUsuarios = async (req, res) => {
    try {
        res.render('administracionUsers', {
            title: 'Usuarios',
            user: req.session.user,
            styles: '../css/administracion.css'
        });
    } catch (error) {
        req.logger.error(error);
        res.render('error404', {});
    }
};





const realtimeproducts = async (req, res) => {
    try {
        res.render('realTimeProducts',
        {
            title: 'Chat en linea',
            styles: 'css/realTimeProducts.css'
        });
    } catch (error) {
        req.logger.error(error);
        res.render('error404', {});
    }
};


const chat = async (req, res) => {
    try {
        res.render('chat',{
            title: 'Chat',
            user: req.session.user,
        });
    } catch (error) {
        req.logger.error(error);
        res.render('error404', {});
    }
};


const mockingproducts = async (req, res) => {
    try {
        let arrayProducts = [];
        for(let i = 0; i < 100; i++) {
            arrayProducts.push(generateProduct());
        }
        res.render('mockingproducts',{
            title: 'mockingproducts',
            user: req.session.user,
            arrayProducts,
            styles: 'css/home.css'
        });
    } catch (error) {
        req.logger.error(error);
        res.render('error404', {});
    }
}; 


const noFound = async (req, res) => {
    try {
        req.logger.error('La pagina que desea acceder no fue encontrada');
        res.render('error404', {});
    } catch (error) {
        req.logger.error(error);
        res.render('error404', {});
    }
}; 

const loggerTest = (req, res) => {
    try {
        req.logger.debug('Prueba debug');
        req.logger.verbose('Prueba verbose');
        req.logger.http('Prueba http');
        req.logger.info('Prueba info');
        req.logger.warn('Prueba warn');
        req.logger.error('Prueba error');
        res.send({message: 'Probando el logger'});
    } catch (error) {
        console.log(error)
    }
}


export {
    register,
    login,
    current,
    recuperarCuenta,
    cambiarPassword,
    productos,
    productDetail,
    cart,
    compraExitosa,
    configuracion,
    administrar,
    administrarProducto,
    administracionUsuarios,
    realtimeproducts,
    chat,
    mockingproducts,
    loggerTest,
    noFound
};