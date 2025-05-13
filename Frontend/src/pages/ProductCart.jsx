import React from 'react';

function ProductCard({ product }) {
  const handleAddToCart = async () => {
    try {
      const response = await fetch('/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product._id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Producto agregado al carrito:', data.message);
        // Aquí puedes actualizar el estado global del carrito o mostrar una notificación al usuario
      } else {
        const errorData = await response.json();
        console.error('Error al agregar al carrito:', errorData.message || 'Error desconocido');
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error de red al agregar al carrito:', error);
      // Aquí puedes mostrar un mensaje de error de red al usuario
    }
  };

  return (
    <article className="position-relative ps-3">
      <p className="product-year">Año: {product.year}</p>
      <p className="product-brand">
        <b>{product.make?.name} {product.model?.name}</b>
      </p>
      <p className="product-price">u$d {product.price.toLocaleString()}</p>
      <button className="btn btn-sm btn-outline-dark" onClick={handleAddToCart}>
        <i className="fa fa-fw fa-cart-shopping text-dark mr-1"></i> Agregar al carrito
      </button>
    </article>
  );
}

export default ProductCard;