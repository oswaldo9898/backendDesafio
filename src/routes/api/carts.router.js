import { Router } from "express";
import Carts from "../../dao/dbManager/carts.js";

const cartsManager = new Carts();
const router = Router();



router.post("/", async (req, res) => {
  try {
    const cartsArr = await cartsManager.addCart();
    res.send({ message: "Success", payload: cartsArr });
  } catch (error) {
    res.status(400).send({status: "Error",message: "Ha ocurrido un inconveniente en el servidor"});
  }
});



router.get("/:cid", async (req, res) => {
  const {cid} = req.params;
  try {
    const cart = await cartsManager.getProductsCart(cid);
    res.send({ message: "Success", payload: cart });
  } catch (error) {
    res.status(400).send({status: "Error",message: "Ha ocurrido un inconveniente en el servidor"});
  }
});



router.post("/:cid/products/:pid", async (req, res) => {
  const {cid, pid} = req.params;
  try {
    const resp = await cartsManager.agregarProductoCart(cid, pid);
    res.send({ message: "Success", payload: resp });
  } catch (error) {
    res.status(400).send({status: "Error",message: "Ha ocurrido un inconveniente en el servidor"});
  }
});



router.delete("/:cid/products/:pid", async (req, res) => {
  const {cid, pid} = req.params;
  try {
    const resp = await cartsManager.eliminarProductoCart(cid, pid);
    res.send({ message: "Success", payload: resp });
  } catch (error) {
    res.status(400).send({status: "Error",message: "Ha ocurrido un inconveniente en el servidor"});
  }
});



router.put("/:cid/products/:pid", async (req, res) => {
  const {cid, pid} = req.params;
  const {cantidad} = req.body;
  try{
    const resp = await cartsManager.actualizarCantidadProductoCart(cid, pid, cantidad);
    res.send({ message: "Success", payload: resp });
  } catch (error) {
    res.status(400).send({status: "Error",message: "Ha ocurrido un inconveniente en el servidor"});
  }
});



router.delete("/:cid", async (req, res) => {
  const {cid, pid} = req.params;
  try {
    const resp = await cartsManager.vaciarCart(cid, pid);
    res.send({ message: "Success", payload: resp });
  } catch (error) {
    res.status(400).send({status: "Error",message: "Ha ocurrido un inconveniente en el servidor"});
  }
});


router.get("/productosPopulate/:cid", async(req, res) => {
  const {cid} = req.params;
  try {
    const resp = await cartsManager.probarPopulate(cid);
    res.send({ message: "Success", payload: resp });
  } catch (error) {
    res.status(400).send({status: "Error",message: "Ha ocurrido un inconveniente en el servidor"});
  }
})

export default router;
