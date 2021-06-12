import { Router } from 'express';
import ComapaniesController from './controllers/CompaniesController';

const router = Router();

router.get('/search', ComapaniesController.getCompanie);

export default router;
