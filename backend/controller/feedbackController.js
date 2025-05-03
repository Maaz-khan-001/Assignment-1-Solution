import { Router } from 'express';
import FacultySearch from '../services/FacultySearchService.js';
import FeedbackForm from '../services/FeedbackFormService.js';

class FeedbackController {
  constructor() {
    this.router = Router();
    this.searchService = new FacultySearch();
    this.formService = new FeedbackForm();

    // Bind routes
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get('/search', this.searchFaculty.bind(this));
    this.router.post('/', this.submitFeedback.bind(this)); // ✅ Correct placement
  }

  async searchFaculty(req, res, next) {
    try {
      const faculty = await this.searchService.findByName(req.query.name);
      res.json(faculty);
    } catch (err) {
      next(err);
    }
  }

  async submitFeedback(req, res, next) {
    try {
      const { studentId, feedback } = req.body;
      const ok = await this.formService.validateAndSubmit(feedback, studentId);
      res.json({ success: ok });
    } catch (err) {
      next(err);
    }
  }
}

// Export only the router instance
export default new FeedbackController().router;
