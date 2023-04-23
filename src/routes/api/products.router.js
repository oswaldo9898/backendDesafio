import { Router } from "express";
import { deleteProduct, getProduct, getProducts, saveProduct, updateProduct } from "../../controllers/products.controller.js";


const router = Router();

router.get("/", getProducts);
router.get("/:pid", getProduct);
router.post("/", saveProduct);
router.put("/:pid", updateProduct);
router.delete("/:pid", deleteProduct);

export default router;
