// backend/models/FeedbackTrackerModel.js
import { Schema, model } from 'mongoose';

const trackerSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  faculty: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
  isSubmitted: { type: Boolean, default: true }
});

// Static method to check if a student has already submitted feedback for a faculty
trackerSchema.statics.checkSubmissionStatus = async function (studentId, facultyId) {
  const record = await this.findOne({ student: studentId, faculty: facultyId });
  return !!record;
};

// Static method to mark a feedback submission
trackerSchema.statics.markSubmitted = async function (studentId, facultyId) {
  // Only create if it doesn't already exist
  const existing = await this.findOne({ student: studentId, faculty: facultyId });
  if (!existing) {
    return this.create({ student: studentId, faculty: facultyId });
  }
  return existing;
};

const FeedbackTracker = model('FeedbackTracker', trackerSchema);

export default FeedbackTracker;
