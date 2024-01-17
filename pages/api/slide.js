import Slide from '../../backend/models/slide'; 
import mongoose from 'mongoose';
await mongoose.connect('mongodb+srv://dishijain:0XFSpF35ZBZNkOR6@cluster0.rmg499r.mongodb.net/intellify?retryWrites=true&w=majority', {
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Connection error:', err));


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {_id, name, description, types } = req.body;
      let slide;
      if (_id) {
        // If slideId is provided, update the existing slide
        slide = await Slide.findByIdAndUpdate(_id, { name, description, types });
      } else {
        // If no slideId is provided, create a new slide
        slide = new Slide({ name, description, types });
        await slide.save();
      }

      res.json(slide);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const slide = await Slide.find({});
      res.json(slide);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
