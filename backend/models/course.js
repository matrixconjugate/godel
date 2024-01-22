// backend/models/course.js
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  modules: [{ type: mongoose.Schema.Types.ObjectId, ref: () => require('./module').default }],
});

const Course = mongoose.models.Course
  ? mongoose.model('Course')
  : mongoose.model('Course', courseSchema);

export default Course;
