import express from 'express';
import mongoose from 'mongoose';
import pkg from 'body-parser';
const { json } = pkg;
import feedbackRoutes from './routes/feedbackRoutes.js';
import authRoutes from './auth/authRoutes.js'; // ✅ Correct path now
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB', error));

// Error handler
app.use((err, req, res, next) => {
  res.status(400).json({ error: err.message });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
