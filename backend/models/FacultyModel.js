import { Schema, model } from 'mongoose';

const facultySchema = new Schema({
  name:       { type: String, required: true, unique: true },
  department: { type: String, required: true },
});

export default model('Faculty', facultySchema);
