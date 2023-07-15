import { Router } from "express";
import { deleteProduct, getPortada, getProduct, getProducts, saveProduct, updateProduct } from "../../controllers/products.controller.js";
import { adminAccess, adminPremiumAccess, privateAccess } from "../../middlewares/authenticate.js";
import { uploader } from "../../utils.js";

const router = Router();

router.get("/", privateAccess, getProducts);
router.get("/:pid", privateAccess, getProduct);
router.post("/", privateAccess, adminPremiumAccess, uploader.single('imgProducto'), saveProduct);
router.put("/:pid", privateAccess, adminPremiumAccess, uploader.single('imgProducto'), updateProduct);
router.delete("/:pid/:userSesion", privateAccess, adminPremiumAccess, deleteProduct);
router.get('/getPortada/:img', getPortada);

export default router;
