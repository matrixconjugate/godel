import Module from '../../backend/models/module';
import mongoose from 'mongoose';
await mongoose.connect('mongodb+srv://dishijain:0XFSpF35ZBZNkOR6@cluster0.rmg499r.mongodb.net/intellify?retryWrites=true&w=majority', {
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Connection error:', err));

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {_id, name, description, slug, slides } = req.body;

      let module;

      if (_id) {
        // If moduleId is provided, update the existing module
        module = await Module.findByIdAndUpdate(_id, { name, description, slug, slides });
      } else {
        // If no moduleId is provided, create a new module
        module = new Module({ _id:_id , name, description, slug, slides });
        await module.save();
      }

      res.json(module);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const module = await Module.find({});
      res.json(module);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
