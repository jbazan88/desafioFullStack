import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Admin = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

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

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/products/${productToDelete.id}`);
      setProducts(products.filter(p => p.id !== productToDelete.id));
      setShowModal(false);
      setProductToDelete(null);
    } catch (err) {
      alert('Error al eliminar el producto');
      setShowModal(false);
      setProductToDelete(null);
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

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
                      width="80%"
                      className="card-img-top"
                      src={`http://localhost:3000/uploads/products/${product.images?.[0]?.name || '/images/default.jpg'}`}
                      alt={`Imagen de ${product.make?.name || 'Marca desconocida'} ${product.model?.name || 'Modelo desconocido'}`}
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
                      <button
                        className="btn btn-sm btn-danger"
                        style={{ fontSize: '18px' }}
                        onClick={() => handleDeleteClick(product)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Modal Bootstrap */}
        {showModal && (
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmar eliminación</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p>¿Estás seguro de que deseas eliminar el producto <b>{productToDelete?.make?.name} {productToDelete?.model?.name}</b>?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
           </div>
        )}
      </section>
    </main>
  );
};

export default Admin;