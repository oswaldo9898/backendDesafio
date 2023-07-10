import {Router} from 'express';
import { deleteUser, deleteUsers, getAllUsers, getUsers, saveDocument, updateRole } from '../../controllers/users.controller.js';
import { adminAccess, privateAccess } from '../../middlewares/authenticate.js';
import { uploader } from '../../utils.js';

const router = Router();

// router.get("/", privateAccess, getUsers);
router.get("/getUsers", privateAccess, getUsers);
router.get("/", getAllUsers);
router.put("/premium/:uid", privateAccess, adminAccess ,updateRole);
router.delete("/", privateAccess, adminAccess, deleteUsers);
router.delete("/:uid", privateAccess, adminAccess, deleteUser);
router.post("/:uid/documents", privateAccess, uploader.single('documento'), saveDocument);



export default router;