// slideModel.js

import mongoose from 'mongoose';

const slideSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  types: {
    type: [String],
    required: true,
    enum: ['media', 'text', 'quiz', 'progress'],
  },
});
const Slide = mongoose.model('Slide', slideSchema);
export default Slide;
