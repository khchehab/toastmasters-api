import { Router } from 'express';
import { findAllPaths, findPathByName, updatePaths } from '../controllers/pathways.controller';

const router = Router();

router.get('/', findAllPaths);
router.get('/:name', findPathByName);

router.post('/update', updatePaths);

export default router;
