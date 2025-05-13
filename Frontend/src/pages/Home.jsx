import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeroCarousel from '../components/HeroCarousel';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []);

  return (
    <main>
      <section>
        <HeroCarousel/>
      </section>
      <section className="bg-light">
        <div className="container py-5">
          <div className="row text-center py-3">
            <div className="col-lg-6 m-auto">
              <h1 className="h1">Elegí tu próximo auto</h1>
            </div>
          </div>
          <div className="row">
            {products.slice(0, 8).map((product) => (
              <div className="col-12 col-sm-6 col-lg-3 my-5" key={product.id}>
                <section className="card h-100 shadow">
                  <a href={`/products/${product.id}`} className="text-decoration-none text-reset">
                    <figure className="product-box_image">
                    <img
  width="80%"
  className="card-img-top"
  src={product.images?.length ? `/images/products/${product.images[0].name}` : '/images/default.jpg'}
  alt={`Imagen de ${product.make?.name || 'Marca desconocida'} ${product.model?.name || 'Modelo desconocido'}`}
/>
                    </figure>
                    <article className="position-relative ps-3">
                      <p className="product-year">Año: {product.year}</p>
                      <p className="product-brand">
                        <b>{product.make?.name} {product.model?.name}</b>
                      </p>
                      <p className="product-price">u$d {product.price.toLocaleString()}</p>
                      <p className="text-secondary border border-secondary rounded d-flex justify-content-center me-3">VER MÁS</p>
                   </article>
                  </a>
                </section>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;