import { Router } from "express";
import CartsManager from "../services/CartsManager.js";
import { __dirname } from "../utils.js";
import { join } from "path";

const router = Router();
const cartsManager = new CartsManager(join(__dirname, "archivo/carritos.json"));



router.post("/", async (req, res) => {
  const cartsArr = await cartsManager.addCart();
  res.send({ message: "Success", payload: cartsArr });
});



router.get("/:cid", async (req, res) => {
  const cid = Number(req.params.cid);
  const cart = await cartsManager.getProductsCart(cid);
  res.send({ message: "Success", payload: cart });
});



router.post("/:cid/products/:pid", async (req, res) => {
  const cid = Number(req.params.cid);
  const pid = Number(req.params.pid);
  const resp = await cartsManager.agregarProductoCart(cid, pid);
  res.send({ message: "Success", payload: resp });
});

export default router;
