import express from 'express';
import ProductManager from './ProductManager.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

//Creamos la instancia de la clase
const productManager = new ProductManager(path.join(dirname,'archivo/productos.json'));

//RUTA PARA OBTENER TODOS LOS PRODUCTOS
app.get('/products', async (req, res) => {
    const { limit } = req.query;
    const products = await productManager.getProducts();

    if(!limit) return res.send(products);

    const productsFilter = products.slice(0,limit);

    res.send(productsFilter);
});

//RUTA PARA OBTENER PRODUCTO POR EL ID
app.get('/products/:pid', async(req, res) => {
    const id = Number(req.params.pid);

    const product = await productManager.getProductById(id);

    res.send(product);
});


app.listen(8080, ()=>{
    console.log('Servidor listening port 8080');
})