import express from 'express';
import { identifyContact } from '../controllers/identifyControllers';

const router = express.Router();

router.post('/', identifyContact);

export default router;
