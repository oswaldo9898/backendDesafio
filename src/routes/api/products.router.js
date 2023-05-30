import { Router } from "express";
import { deleteProduct, getProduct, getProducts, saveProduct, updateProduct } from "../../controllers/products.controller.js";
import { adminAccess, adminPremiumAccess, privateAccess } from "../../middlewares/authenticate.js";
import { uploader } from "../../utils.js";

const router = Router();

router.get("/", privateAccess, getProducts);
router.get("/:pid", privateAccess, getProduct);
router.post("/", privateAccess, adminPremiumAccess, uploader.single('imgProducto'), saveProduct);
router.put("/:pid", privateAccess, adminPremiumAccess, updateProduct);
router.delete("/:pid/:userSesion", privateAccess, adminPremiumAccess, deleteProduct);

export default router;
