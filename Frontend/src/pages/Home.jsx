import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  // Obtener productos desde la API
  useEffect(() => {
    axios.get('http://localhost:3000/api/products') // Cambia la URL según tu backend
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []);

  return (
    <main>
      {/* Carousel */}
      <div id="hero-carousel" className="carousel slide" data-bs-ride="carousel">
        <ol className="carousel-indicators">
          <li data-bs-target="#hero-carousel" data-bs-slide-to="0" className="active"></li>
          <li data-bs-target="#hero-carousel" data-bs-slide-to="1"></li>
          <li data-bs-target="#hero-carousel" data-bs-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                  <img className="img-fluid" src="/images/banner_img_01.png" alt="Toyota Corolla" />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left align-self-center">
                    <h1 className="h1">Toyota Corolla</h1>
                    <h3 className="h2">¡UN ÍCONO CON TODO LO QUE TE MUEVE!</h3>
                    <p>
                      Conocé todo acerca del Corolla 2025, el ícono de los sedanes en su mejor versión.
                      El vehículo que representa la calidad Toyota, ahora con más tecnología, seguridad y diseño moderno.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Agrega más items del carousel aquí */}
        </div>
        <a className="carousel-control-prev text-decoration-none w-auto ps-3" href="#hero-carousel" role="button" data-bs-slide="prev">
          <i className="fas fa-chevron-left"></i>
        </a>
        <a className="carousel-control-next text-decoration-none w-auto pe-3" href="#hero-carousel" role="button" data-bs-slide="next">
          <i className="fas fa-chevron-right"></i>
        </a>
      </div>

      {/* Sección de productos */}
      <section className="bg-light">
        <div className="container py-5">
          <div className="row text-center py-3">
            <div className="col-lg-6 m-auto">
              <h1 className="h1">Elegí tu próximo auto</h1>
            </div>
          </div>
          <div className="row">
            {products.map((product) => (
              <div className="col-12 col-sm-6 col-lg-3 my-5" key={product.id}>
                <section className="card h-100 shadow">
                  <a href={`/products/detail/${product.id}`} className="text-decoration-none text-reset">
                    <figure className="product-box_image">
                      <img
                        width="80%"
                        className="card-img-top"
                        src={product.images?.length ? product.images[0].name : '/images/default.jpg'}
                        alt={`Imagen de ${product.make?.name} ${product.model?.name}`}
                      />
                    </figure>
                    <article className="position-relative ps-3">
                      <p className="product-year">Año: {product.year}</p>
                      <p className="product-brand">
                        <b>{product.make?.name} {product.model?.name}</b>
                      </p>
                      <p className="product-price">u$d {product.price.toLocaleString()}</p>
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