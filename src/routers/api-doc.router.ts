import { readFileSync } from 'fs';
import { join } from 'path';
import yaml from 'yaml';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

const router = Router();

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(yaml.parse(readFileSync(join(process.cwd(), 'api-v1', 'api-doc.yaml'), 'utf-8'))));

export default router;
