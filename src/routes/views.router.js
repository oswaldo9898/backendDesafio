import { Router } from 'express';
import ProductManager from "../services/ProductManager.js";
import { __dirname } from "../utils.js";
import { join } from "path";

const router = Router();

const productManager = new ProductManager(
    join(__dirname, "archivo/productos.json")
);

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home',{
        products,
        styles:'home.css'
    });
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts',
    {
        styles:'realTimeProducts.css'
    });
})


export default router;