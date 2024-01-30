// pages/api/login.js
import dbConnect from '../../utils/dbConnect';
import Admin from '../../models/admin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dbConnect();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name , email, password } = req.body;

  try {
    const adminPassword = process.env.NEXT_PUBLIC_PASSWORD;
    if (password === adminPassword) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = new Admin({
        name,
        email,
        password: hashedPassword,
      });

      await admin.save();

      const token = jwt.sign({ userId: admin._id }, process.env.NEXT_PUBLIC_JWT_SECRET, {
        expiresIn: '1h',
      });

      return res.status(200).json({ token, message: 'Logged in successfully and user information saved.' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
