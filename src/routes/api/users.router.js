import {Router} from 'express';
import { getUsers, saveDocument, updateRole } from '../../controllers/users.controller.js';
import { adminAccess, privateAccess } from '../../middlewares/authenticate.js';
import { uploader } from '../../utils.js';

const router = Router();

router.get("/", privateAccess, getUsers);
router.put("/premium/:uid", privateAccess, adminAccess ,updateRole);
router.post("/:uid/documents", privateAccess, uploader.single('documento'), saveDocument);



export default router;