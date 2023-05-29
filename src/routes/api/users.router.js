import {Router} from 'express';
import { getUsers, updateRole } from '../../controllers/users.controller.js';
import { adminAccess, privateAccess } from '../../middlewares/authenticate.js';

const router = Router();

router.get("/", privateAccess, getUsers);
router.put("/", privateAccess, adminAccess ,updateRole);



export default router;