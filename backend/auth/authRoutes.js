// backend/auth/authRoutes.js
import express from 'express';
import * as authController from './authController.js'; // ✅ Correct

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
