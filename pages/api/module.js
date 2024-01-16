import Module from '../../backend/models/module';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, description, slug, slides } = req.body;

      let module;

      if (req.body.moduleId) {
        // If moduleId is provided, update the existing module
        module = await Module.findByIdAndUpdate(req.body.moduleId, { name, description, slug, slides });
      } else {
        // If no moduleId is provided, create a new module
        module = new Module({ name, description, slug, slides });
        await module.save();
      }

      res.json(module);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const module = await Module.findById(req.query.moduleId);
      res.json(module);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
