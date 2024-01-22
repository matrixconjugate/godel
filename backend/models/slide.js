import mongoose from 'mongoose';
import Module from './module';
import Course from './course';
const slideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  types: {
    type: [String],
    required: true,
    enum: ['media', 'text', 'quiz', 'progress'],
  },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:Module,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Course,
    required: true,
  },
});

const Slide = mongoose.model('Slide', slideSchema);

export default Slide;
