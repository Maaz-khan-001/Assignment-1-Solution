import express from 'express';
import feedbackRouter from '../controller/feedbackController.js';

const router = express.Router();

// If feedbackRouter is already a router, just export it
router.use('/', feedbackRouter); // Or define your actual routes here

export default router;
