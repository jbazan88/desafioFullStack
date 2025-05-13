const db = require('../database/models');

module.exports = {
  getDropdowns: async (req, res) => {
    try {
      const makes = await db.Make.findAll({ attributes: ['id', 'name'] });
      const models = await db.Pattern.findAll({ attributes: ['id', 'name'] });
      const states = await db.State.findAll({ attributes: ['id', 'name'] });
      const categories = await db.Category.findAll({ attributes: ['id', 'name'] });
      const transmissions = await db.Transmission.findAll({ attributes: ['id', 'name'] });
      const origins = await db.Origin.findAll({ attributes: ['id', 'country'] });

      return res.status(200).json({
        makes,
        models,
        states,
        categories,
        transmissions,
        origins,
      });
    } catch (error) {
      console.error('Error al obtener los datos de los dropdowns:', error);
      return res.status(500).json({ error: 'Error al obtener los datos de los dropdowns' });
    }
  },
};