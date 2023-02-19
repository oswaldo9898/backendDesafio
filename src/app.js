import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';

import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';

import ProductManager from "./services/ProductManager.js";
import { join } from "path";

const productManager = new ProductManager(
  join(__dirname, "/archivo/productos.json")
);

const app = express();

/** ESTABLECIENDO RUTA PUBLICA */
app.use(express.static(`${__dirname}/public`));
/** */

/**CONFIGURACION PARA LA RECEPCION DE JSON */
app.use(express.json());
app.use(express.urlencoded({extended:true}));
/** */

/** CONFIGURANDO EL MOTOR DE PLANTILLAS */
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
/** */

/** RUTAS */
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


const server = app.listen(8080, ()=>{
  console.log('Servidor listening port 8080');
});



/** SOCKET */
const io = new Server(server);

io.on('connection', async socket => {
  console.log('Nuevo cliente conectado');

  const products = await productManager.getProducts();
  socket.emit('allProducts', products);

  socket.on('deletProduct', async (idProduct) => {
    await productManager.deleteProduct(idProduct);
  });
  
  socket.on('addProduct', async (newProduct) => {
    await productManager.addProduct(newProduct);
  });
})

