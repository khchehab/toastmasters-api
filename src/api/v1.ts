import { Router } from 'express';
import pathwayRouter from '../routers/pathway.router';
import roleRouter from '../routers/role.router';
import cabinetRoleRouter from '../routers/cabinet-role.router';

const router = Router();

router.use('/paths', pathwayRouter);
router.use('/roles', roleRouter);
router.use('/cabinet-roles', cabinetRoleRouter);

export default router;
