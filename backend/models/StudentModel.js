import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
