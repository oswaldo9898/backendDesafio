import { Router } from "express";
import Products from './../../dao/dbManager/products.js';

const productsManager = new Products();
const router = Router();



router.get("/", async (req, res) => {
  const { limit } = req.query;
  const products = await productsManager.getAll();

  console.log('Aqui')

  if (!limit) return res.send(products);
  const productsFilter = products.slice(0, limit);

  res.send(productsFilter);
});



router.get("/:pid", async (req, res) => {
  const pid =req.params.pid;

  try{
    const product = await productsManager.getProductById(pid);
    product.length === 0
    ? res.send({
        status: "Error",
        message: "Not found: Producto no encontrado",
      })
    : res.send({ message: "Success", payload: product });
  }catch(e) {

  }
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

    const productArr = await productsManager.save(product);
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
    const respon = await productsManager.update(pid, product);
    res.send(respon);
  }
});



router.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;
  console.log(pid)
  // if (pid) {
  //   const respon = await productsManager.delete(pid);
  //   res.send(respon);
  // } else {
  //   res.send({ status: "Error", message: "El producto es invalido" });
  // }
});

export default router;
