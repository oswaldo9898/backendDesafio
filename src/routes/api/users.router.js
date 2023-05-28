import {Router} from 'express';
import { getUsers } from '../../controllers/users.controller.js';
import { privateAccess } from '../../middlewares/authenticate.js';

const router = Router();

router.get("/", privateAccess, getUsers);


export default router;