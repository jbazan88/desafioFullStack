const db = require('../database/models');

module.exports = {
  list: async (req, res) => {
    try {
      const products = await db.Product.findAll({
        include: ['images'], // Relación con imágenes
      });
      return res.status(200).json(products);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      return res.status(500).json({ error: 'Error al obtener los productos' });
    }
  },

  detail: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id, {
        include: ['images', 'model', 'make', 'transmission'],
      });

      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      return res.status(200).json(product);
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      return res.status(500).json({ error: 'Error al obtener el producto' });
    }
  },

  create: async (req, res) => {
    try {
      const { price, model, make, transmission, mileage, state, category, year, origin, description } = req.body;

      const product = await db.Product.create({
        makeId: make,
        patternId: model,
        categoryId: category,
        stateId: state,
        description: description.trim(),
        originId: origin,
        year,
        mileage,
        transmissionId: transmission,
        price,
      });

      if (req.file) {
        await db.Image.create({
          name: req.file.filename,
          productId: product.id,
        });
      }

      return res.status(201).json(product);
    } catch (error) {
      console.error('Error al crear el producto:', error);
      return res.status(500).json({ error: 'Error al crear el producto' });
    }
  },

  // Actualizar un producto
  update: async (req, res) => {
    try {
      const { price, model, make, transmission, mileage, state, category, year, origin, description } = req.body;

      const product = await db.Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      await product.update({
        makeId: make,
        patternId: model,
        categoryId: category,
        stateId: state,
        description: description.trim(),
        originId: origin,
        year,
        mileage,
        transmissionId: transmission,
        price,
      });

      return res.status(200).json(product);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      return res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  },

  // Eliminar un producto
  remove: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      await product.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      return res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  },

  // Obtener datos para los dropdowns

uploadImage: async (req, res) => {
    try {
      const productId = req.params.id;

      // Verificar si el producto existe
      const product = await db.Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      // Guardar la imagen en la base de datos
      if (req.file) {
        await db.Image.create({
          name: req.file.filename,
          productId: productId,
        });
        return res.status(201).json({ message: 'Imagen subida con éxito' });
      } else {
        return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    }
};
