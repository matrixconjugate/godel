// pages/api/login.js
import dbConnect from '../../utils/dbConnect';
import Learner from '../../models/learner';

export default async function handler(req, res) {
    await dbConnect();

  if (req.method === 'POST') {
    const { email, password } = req.body;
    try {
      const learner = await Learner.findOne({ email, password });
      
      if (learner) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
