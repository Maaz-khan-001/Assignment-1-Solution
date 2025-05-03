import { Schema, model } from 'mongoose';

const responseSchema = new Schema({
  questionId: { type: String, required: true },
  answer:     { type: String, required: true },
});

const feedbackSchema = new Schema({
  student:        { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  faculty:        { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
  responses:      [ responseSchema ],
  comment:        { type: String },
  submissionDate: { type: Date, default: Date.now },
});

export default model('Feedback', feedbackSchema);
