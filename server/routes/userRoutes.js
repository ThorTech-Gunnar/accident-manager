import express from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, authorize(['Admin']), getUsers);
router.get('/:id', authenticate, getUserById);
router.put('/:id', authenticate, authorize(['Admin']), updateUser);
router.delete('/:id', authenticate, authorize(['Admin']), deleteUser);

export default router;