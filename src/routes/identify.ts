import { Router } from 'express';
import { identifyContact } from '../controllers/identifyControllers';

const router = Router();
router.post('/', identifyContact);

export default router;