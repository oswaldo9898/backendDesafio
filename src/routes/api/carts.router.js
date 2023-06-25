import { Router } from "express";
import { addCart, addProductCart, deleteProductCart, emptyCart, getProductsCart, getTicket, probarPopulate, purchase, updateProductsCart, updateQuantityProductCart } from "../../controllers/carts.controller.js";
import { privateAccess, userAccess } from "../../middlewares/authenticate.js";

const router = Router();

router.post("/", addCart);
router.get("/:cid",privateAccess, userAccess, getProductsCart);
router.post("/:cid/products/:pid",privateAccess, userAccess, addProductCart);
router.delete("/:cid/products/:pid", deleteProductCart);
router.put("/:cid", updateProductsCart);
router.put("/:cid/products/:pid", updateQuantityProductCart);
router.delete("/:cid", emptyCart);
router.post("/:cid/purchase", purchase);
router.get("/obtener-ticket/:id", getTicket);

// router.post("/", addCart);
// router.get("/:cid", getProductsCart);
// router.post("/:cid/products/:pid", addProductCart);
// router.delete("/:cid/products/:pid", deleteProductCart);
// router.put("/:cid", updateProductsCart);
// router.put("/:cid/products/:pid", updateQuantityProductCart);
// router.delete("/:cid", emptyCart);
// router.post("/:cid/purchase", purchase);
// router.get("/obtener-ticket/:id", getTicket);


export default router;
