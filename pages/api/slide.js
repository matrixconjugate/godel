import mongoose from 'mongoose';
import Slide from '../../backend/models/slide';
import Module from '../../backend/models/module';
import Course from '../../backend/models/course';

await mongoose.connect('mongodb+srv://dishijain:0XFSpF35ZBZNkOR6@cluster0.rmg499r.mongodb.net/intellify?retryWrites=true&w=majority', {
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Connection error:', err));

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { moduleId, courseId, name, description, types } = req.body;

      const module = await Module.findById(moduleId);
      if (!module) {
        return res.status(404).json({ error: 'Module not found' });
      }

      const slide = new Slide({ name, description, types, moduleId, courseId });
      await slide.save();

      module.slides.push(slide._id);
      await module.save();

      res.json(slide);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const slides = await Slide.find({});
      res.json(slides);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
