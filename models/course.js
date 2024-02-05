// models/course.js
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  course_name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  modules: [
    {
      module_name: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
      },
      slides: [
        {
          moduleId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
          },
          slide_name: {
            type: String,
            required: true,
          },
          slide_type: {
            type: String,
            required: true,
          },
          slug: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});


const Course = mongoose.models.Course
  ? mongoose.model('Course')
  : mongoose.model('Course', courseSchema);

export default Course;
