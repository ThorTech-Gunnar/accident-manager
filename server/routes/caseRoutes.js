import express from 'express';
import { getCases, getCaseById, createCase, updateCase, deleteCase } from '../controllers/caseController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, getCases);
router.get('/:id', authenticate, getCaseById);
router.post('/', authenticate, createCase);
router.put('/:id', authenticate, updateCase);
router.delete('/:id', authenticate, authorize(['Admin', 'Manager']), deleteCase);

export default router;