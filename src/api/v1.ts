import { Router } from 'express';
import pathwayRouter from '../routers/pathway.router';

const router = Router();

router.use('/paths', pathwayRouter);

export default router;
