import { Router } from 'express';
import { findAllRoles, updateRoles } from '../controllers/role.controller';

const router = Router();

router.get('/', findAllRoles);
router.post('/update', updateRoles);

export default router;
