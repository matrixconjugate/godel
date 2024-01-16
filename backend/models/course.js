import mongoose from 'mongoose';

const Course = mongoose.models.Course || mongoose.model('Course', {
  _id: mongoose.Schema.Types.ObjectId,
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
  modules: [{
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  }],
});

export default Course;
