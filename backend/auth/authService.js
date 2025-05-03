// backend/services/authService.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Student from '../models/studentModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const registerStudent = async (studentData) => {
  const hashedPassword = await bcrypt.hash(studentData.password, 10);
  const student = new Student({ ...studentData, password: hashedPassword });
  return student.save();
};

export const loginStudent = async (email, password) => {
  const student = await Student.findOne({ email });
  if (!student) return null;

  const isMatch = await bcrypt.compare(password, student.password); // ✅
  if (!isMatch) return null;

  const token = jwt.sign({ id: student._id }, JWT_SECRET, { expiresIn: '1d' });
  return { student, token };
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
