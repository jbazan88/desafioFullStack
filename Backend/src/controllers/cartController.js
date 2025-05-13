const Product = require('../database/models/Product'); // Ajusta la ruta a tu modelo de producto

module.exports = {
  addToCart: async (req, res) => {
    const { productId } = req.body;

    try {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      // Inicializar el carrito en la sesión si no existe
      if (!req.session.cart) {
        req.session.cart = [];
      }

      // Verificar si el producto ya está en el carrito
      const existingItem = req.session.cart.find(item => item.productId === productId);

      if (existingItem) {
        // Si ya existe, puedes incrementar la cantidad o simplemente indicar que ya está agregado
        existingItem.quantity = (existingItem.quantity || 1);
        res.json({ message: 'Cantidad del producto incrementada en el carrito', cart: req.session.cart });
      } else {
        // Si no existe, agregar el producto al carrito
        req.session.cart.push({ productId: product._id, name: product.name, price: product.price, quantity: 1 });
        res.json({ message: 'Producto agregado al carrito', cart: req.session.cart });
      }
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      res.status(500).json({ message: 'Error al agregar el producto al carrito' });
    }
  },
};