import { Router } from 'express';
import { findAllPaths, findPathByName } from '../controllers/pathways.controller';

const router = Router();

router.get('/', findAllPaths);
router.get('/:name', findPathByName);

export default router;
