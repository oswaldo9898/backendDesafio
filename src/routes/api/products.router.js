import { Router } from "express";
import { deleteProduct, getProduct, getProducts, saveProduct, updateProduct } from "../../controllers/products.controller.js";
import { adminAccess, privateAccess } from "../../middlewares/authenticate.js";
import { uploader } from "../../utils.js";

const router = Router();

router.get("/", privateAccess, getProducts);
router.get("/:pid", privateAccess, getProduct);
router.post("/", privateAccess, adminAccess, uploader.single('imgProducto'), saveProduct);
router.put("/:pid", privateAccess, adminAccess, updateProduct);
router.delete("/:pid", privateAccess, adminAccess, deleteProduct);

export default router;
