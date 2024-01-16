import mongoose from 'mongoose';
import Course from '../../backend/models/course';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, description, slug, modules, courseId } = req.body;

      let course;

      if (courseId) {
        // If courseId is provided, update the existing course
        const isValidObjectId = mongoose.Types.ObjectId.isValid(courseId);

        if (!isValidObjectId) {
          return res.status(400).json({ error: 'Invalid courseId format' });
        }

        course = await Course.findByIdAndUpdate(courseId, { name, description, slug, modules }, { new: true });
      } else {
        // If no courseId is provided, create a new course
        course = new Course({ name, description, slug, modules });
        await course.save();
      }

      res.json(course);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const courseId = req.query.courseId;
      const isValidObjectId = mongoose.Types.ObjectId.isValid(courseId);

      if (!isValidObjectId) {
        return res.status(400).json({ error: 'Invalid courseId format' });
      }

      const course = await Course.findById(courseId);
      
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      res.json(course);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
