import  findOne  from '../models/FacultyModel.js';

class FacultySearchService {
  async findByName(name) {
    const faculty = await findOne({ name });
    if (!faculty) throw new Error(`No faculty found for name="${name}"`);
    return faculty;
  }
}

export default FacultySearchService;
