import { Router } from 'express';
import { findAllCabinetRoles, updateCabinetRoles } from '../controllers/cabinet-role.controller';

const router = Router();

router.get('/', findAllCabinetRoles);
router.post('/update', updateCabinetRoles);

export default router;
