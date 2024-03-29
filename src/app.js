import express from 'express';
import session from 'express-session';
import productsRouter from './routes/api/products.router.js';
import cartsRouter from './routes/api/carts.router.js';
import sessionRouter from './routes/api/session.router.js';
import usersRouter from './routes/api/users.router.js';
import viewsRouter from './routes/web/views.router.js';
import {__dirname }  from './utils.js';
import Products from './dao/dbManager/products.js';
import Messages from './dao/dbManager/messages.js';

import './dao/db.config.js'; 

import handlebars from 'express-handlebars';
import { helpers } from './config/handlebars-helpers.js';
import { Server } from 'socket.io';

import initializePassport from './config/passport.config.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import errorHandler from './middlewares/errors/index.js';

//Logger
import { addLogger } from './utils/logger/index.js';
import cors from 'cors';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import MongoStore from 'connect-mongo';

const productsManager = new Products();
const messagesManager = new Messages();

import config from "./config/config.js";


// const productManager = new ProductManager(
//   join(__dirname, "/archivo/productos.json")
// );

const app = express();

/**Parametros de conexion */
const USER = 'oswaldogarces98';
const PASSWORD = 'nIcHH2K83fj7dWZP';
const DATA_BASE = 'ecommerce';

// try{
//   await mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.maeqnip.mongodb.net/${DATA_BASE}?retryWrites=true&w=majority`);
// } catch (error) {
//   console.log(error);
// }


//Persistencia en BBDD
app.use(session({
  store: MongoStore.create({
      // mongoUrl: `mongodb+srv://${USER}:${PASSWORD}@cluster0.maeqnip.mongodb.net/${DATA_BASE}?retryWrites=true&w=majority`,
      mongoUrl: config.mongoURL,
      mongoOptions: { useNewUrlParser: true },
      ttl: 3600
  }),
  secret:'secretCoder',
  resave: true,
  saveUninitialized: true
}));


app.use(cors());
//Permiso para conectar el backend y frontend
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*'); 
  res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.header('Allow','GET, PUT, POST, DELETE, OPTIONS, PATCH');
  next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json({limit: '50mb', extends: true}))
/** */




/** ESTABLECIENDO RUTA PUBLICA */
app.use(express.static(`${__dirname}/public`));
/** */

app.use(cookieParser());


/**CONFIGURACION PARA LA RECEPCION DE JSON */
app.use(express.json());
app.use(express.urlencoded({extended:true}));





/** CONFIGURANDO EL MOTOR DE PLANTILLAS */
/** PARTIALS-HELPER */
const hbs = handlebars.create({
  helpers
})

app.engine('handlebars', hbs.engine);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
/** */



/**Logger */
app.use(addLogger);



/**configuracion de passport*/
initializePassport();
app.use(passport.initialize());
/**  */


/** Configrando Swagger */
const swaggerOptions = {
  definition:{
    openapi: '3.0.1',
    info:{
      title: 'Documentación del proyecto de ecommerce',
      description: 'API desarrollada para el comercio de productos online'
    }
  },
  apis: [`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJsdoc(swaggerOptions);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
//////////////////////////////////////////////////////////////////////////*


/** RUTAS */
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler);

const server = app.listen(config.port, ()=>{
  console.log(`Servidor listening port${config.port}`);
});



/** SOCKET */
const io = new Server(server);
const messages = []

io.on('connection', async socket => {
  console.log('Nuevo cliente conectado');

  const products = await productsManager.getProducts();
  socket.emit('allProducts', products);

  socket.on('deleteProduct', async (idProduct) => {
    await productsManager.delete(idProduct);
    const products = await productsManager.getProducts();
    socket.emit('allProducts', products);
  });
  
  socket.on('addProduct', async (newProduct) => {
    await productsManager.save(newProduct);
    const products = await productsManager.getProducts();
    socket.emit('allProducts', products);
  });


  /** CHAT */
  socket.on('message', data => {
    messages.push(data);
    const message = messagesManager.save(data)
    io.emit('messageLogs', messages);
  })


  // Solo envia los datos al usuario que lo solicita
  socket.on('authenticated', data => {
      socket.emit('messageLogs', messages);
      //Envia el mensaje a los demas usuarios pero no al que lo emite
      socket.broadcast.emit('newUserConnected', data)
  })
  /** FIN CHAT */
})



