import mongoose from 'mongoose';
const learnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  preferences: {
    type: [String],
  },
  PIN: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 6,
  },
});
const Learner = mongoose.model('Learner', learnerSchema);
export default Learner;
