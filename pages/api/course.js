import mongoose from 'mongoose';
import Course from '../../backend/models/course';
await mongoose.connect('mongodb+srv://dishijain:0XFSpF35ZBZNkOR6@cluster0.rmg499r.mongodb.net/intellify?retryWrites=true&w=majority', {
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Connection error:', err));


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { _id , name, description, slug, modules } = req.body;
      let course;
      if (_id) {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(_id);
        if (!isValidObjectId) {
          return res.status(400).json({ error: 'Invalid courseId format' });
        }
        course = await Course.findByIdAndUpdate(_id, { name, description, slug, modules }, { new: true });
      } else {
        // If no courseId is provided, create a new course
        course = new Course({name, description, slug, modules });
        await course.save();
      }

      res.json(course);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
