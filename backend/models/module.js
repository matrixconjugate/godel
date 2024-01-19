// backend/api/module.js
import mongoose from 'mongoose';
import Course from '../../backend/models/course';
import Slide from './slide';

const moduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  slides: [{ type: mongoose.Schema.Types.ObjectId, ref: Slide }],
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Course, 
    required: true,
  },
});

const Module = mongoose.model('Module', moduleSchema);

export default Module;
