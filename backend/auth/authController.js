// backend/auth/authController.js
import { registerStudent, loginStudent } from './authService.js';

export async function register(req, res) {
  try {
    const { email } = req.body;

    // Prevent duplicate email registration (in service or here)
    const newStudent = await registerStudent(req.body);

    res.status(201).json({ message: 'Student registered', student: newStudent });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const result = await loginStudent(email, password);

    if (!result) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ token: result.token, studentId: result.student._id });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
}
