import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Admin = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {axios
      .get('http://localhost:3000/products/')
      .then((response) => {
        setProducts(response.data); 
        setLoading(false); 
      })
      .catch((err) => {
        console.error('Error al obtener los productos:', err);
        setError('No se pudieron cargar los productos.');
        setLoading(false); 
      });
  }, []); 

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <section className="container products-wrapper">
        <div className="row text-center py-3">
          <h1>Administración de Productos</h1>
        </div>
        <div className="container d-flex justify-content-end">
          <button
            className="btn btn-primary btn-block mb-3"
            onClick={() => (window.location.href = '/products/add')}
          >
            Agregar Nuevo Producto
          </button>
        </div>

        <div className="container">
          <div className="row">
            {products.map((product) => (
              <div className="col-12 col-md-4 mb-4" key={product.id}>
                <div className="card h-100 shadow">
                  <img
                    src={
                      product.images && product.images.length
                        ? product.images[0].name
                        : '/images/default.jpg'
                    }
                    className="card-img-top"
                    alt={`${product.make?.name || 'Marca desconocida'} ${
                      product.model?.name || 'Modelo desconocido'
                    }`}
                  />
                  <div className="card-body">
                    <p className="product-year">Año: {product.year}</p>
                    <p className="product-brand">
                      <b>
                        {product.make?.name || 'Marca desconocida'}{' '}
                        {product.model?.name || 'Modelo desconocido'}
                      </b>
                    </p>
                    <p className="product-price">u$d {product.price}</p>
                    <div className="d-flex gap-2 align-items-center justify-content-end">
                      <Link
                        to={`/products/edit/${product.id}`}
                        className="btn btn-sm btn-success"
                      >
                        Editar
                      </Link>
                      <form
                        action={`/products/remove/${product.id}?_method=DELETE`}
                        method="POST"
                      >
                        <button
                          className="btn btn-sm btn-danger"
                          style={{ fontSize: '18px' }}
                        >
                          Eliminar
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Admin;