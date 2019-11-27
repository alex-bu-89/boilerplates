import express from 'express';
import userController from '../controllers/users';
const router = express.Router();

router.get('/users', userController.getAll);

export default router;
