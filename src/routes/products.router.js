import { Router } from "express";
import ProductManager from "../services/ProductManager.js";
import { __dirname } from "../utils.js";
import { join } from "path";

const router = Router();
const productManager = new ProductManager(
  join(__dirname, "archivo/productos.json")
);



router.get("/", async (req, res) => {
  const { limit } = req.query;
  const products = await productManager.getProducts();

  if (!limit) return res.send(products);
  const productsFilter = products.slice(0, limit);
  res.send(productsFilter);
});



router.get("/:pid", async (req, res) => {
  const id = Number(req.params.pid);
  const product = await productManager.getProductById(id);
  product.length === 0
    ? res.send({
        status: "Error",
        message: "Not found: Producto no encontrado",
      })
    : res.send({ message: "Success", payload: product });
});




router.post("/", async (req, res) => {
  const data = req.body;

  if (
    data.title === undefined || data.description === undefined || data.code === undefined ||
    data.price === undefined || data.stock === undefined || data.category === undefined ) {
    res.status(400).send({status: "Error",message: "Debe ingresar todos los datos solicitados"});
  } else {
    const product = {
      title: data.title,
      description: data.description,
      code: data.code,
      price: data.price,
      status: true,
      stock: data.stock,
      category: data.category,
      thumbnail: [],
    };

    const productArr = await productManager.addProduct(product);
    res.send({ message: "Success", payload: productArr });
  }
});




router.put("/:pid", async (req, res) => {
  const pid = Number(req.params.pid);
  const data = req.body;

  if (
    data.title === undefined || data.description === undefined || data.code === undefined || data.price === undefined ||
    data.stock === undefined || data.category === undefined || data.status === undefined ) {
    res.status(400).send({status: "Error",message: "Debe ingresar todos los datos solicitados"});
  } else {
    const product = {
      title: data.title,
      description: data.description,
      code: data.code,
      price: data.price,
      status: data.status,
      stock: data.stock,
      category: data.category,
      thumbnail: [],
    };
    const respon = await productManager.updateProduct(pid, product);
    res.send(respon);
  }
});




router.delete("/:pid", async (req, res) => {
  const pid = Number(req.params.pid);
  if (pid) {
    const respon = await productManager.deleteProduct(pid);
    res.send(respon);
  } else {
    res.send({ status: "Error", message: "El producto es invalido" });
  }
});

export default router;
