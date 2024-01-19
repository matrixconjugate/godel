// backend/api/course.js
import mongoose from 'mongoose';
import Course from '../../backend/models/course';
import Module from '../../backend/models/module';

await mongoose.connect('mongodb+srv://dishijain:0XFSpF35ZBZNkOR6@cluster0.rmg499r.mongodb.net/intellify?retryWrites=true&w=majority', {
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Connection error:', err));

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { courseId, name, description, slug, slides } = req.body;

      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      const module = new Module({ name, description, slug, slides, courseId });
      await module.save();

      // Add the module's ID to the course's modules array
      course.modules.push(module._id);
      await course.save();

      res.json(module);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const courses = await Course.find().populate('modules');
      res.json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET' && req.query.courseId && req.query.action === 'modules') {
    try {
      const courseId = req.query.courseId;

      const course = await Course.findById(courseId).populate({
        path: 'modules',
        populate: { path: 'slides' }
      });

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      res.json(course.modules);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
