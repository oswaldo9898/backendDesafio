import { Router } from "express";
import Carts from "../../dao/dbManager/carts.js";

const cartsManager = new Carts();
const router = Router();



router.post("/", async (req, res) => {
  const cartsArr = await cartsManager.addCart();
  res.send({ message: "Success", payload: cartsArr });
});



router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const cart = await cartsManager.getProductsCart(cid);
  res.send({ message: "Success", payload: cart });
});



router.post("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const resp = await cartsManager.agregarProductoCart(cid, pid);
  res.send({ message: "Success", payload: resp });
});

export default router;
