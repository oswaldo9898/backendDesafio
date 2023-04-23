import { Router } from "express";
import { addCart, addProductCart, deleteProductCart, emptyCart, getProductsCart, probarPopulate, updateProductsCart, updateQuantityProductCart } from "../../controllers/carts.controller.js";

const router = Router();

router.post("/", addCart);
router.get("/:cid", getProductsCart);
router.post("/:cid/products/:pid", addProductCart);
router.delete("/:cid/products/:pid", deleteProductCart);
router.put("/:cid", updateProductsCart);
router.put("/:cid/products/:pid", updateQuantityProductCart);
router.delete("/:cid", emptyCart);
router.get("/productosPopulate/:cid", probarPopulate)


export default router;
