// backend/services/FeedbackFormService.js
import FeedbackTracker from '../models/FeedbackTrackerModel.js';

class FeedbackForm {
  // Validate and submit feedback
  async validateAndSubmit(feedbackData, studentId, facultyId) {
    // Check if feedback has already been submitted for this student and faculty
    const alreadySubmitted = await FeedbackTracker.checkSubmissionStatus(studentId, facultyId);
    
    if (alreadySubmitted) {
      return { message: 'Feedback already submitted' }; // Return if already submitted
    }

    // Save the actual feedback (you might have another model for feedback content)
    await FeedbackTracker.markSubmitted(studentId, facultyId); // Mark as submitted

    // Here you can save feedbackData to a Feedback model if needed (e.g., rating, comments)
    // const newFeedback = new FeedbackModel(feedbackData);
    // await newFeedback.save();

    return { message: 'Feedback successfully submitted' };
  }
}

export default FeedbackForm;
