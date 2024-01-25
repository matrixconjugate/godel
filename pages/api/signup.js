// pages/api/signup.js
import dbConnect from '../../utils/dbConnect';
import Learner from '../../models/learner';

export default async function handler(req, res) {
    await dbConnect();

  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    try {
      const existingLearner = await Learner.findOne({ email });

      if (existingLearner) {
        res.status(400).json({ message: 'Email already in use' });
      } else {
        const newLearner = new Learner({ name, email, password });
        await newLearner.save();

        // Successful signup
        res.status(201).json({ message: 'Signup successful' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
