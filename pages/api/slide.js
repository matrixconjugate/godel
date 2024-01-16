import Slide from '../../backend/models/slide'; 

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, description, types } = req.body;

      let slide;

      if (req.body.slideId) {
        // If slideId is provided, update the existing slide
        slide = await Slide.findByIdAndUpdate(req.body.slideId, { name, description, types });
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
      const slide = await Slide.findById(req.query.slideId);
      res.json(slide);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
