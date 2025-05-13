import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; 

const Detail = () => {
  const [product, setProduct] = React.useState(null);
  const { id: productId } = useParams(); 

  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${productId}`) 
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error al obtener el producto:", error));
  }, [productId]);

  if (!product) return <div>Cargando...</div>; 

  return (
    <main>
        <section className="bg">
      <div className="container mt-4">
        <div className="row">
          
          <div className="col-md-6">
            <div className="card">
              <img
                src={
                  product.images && product.images.length > 0
                    ? `/images/products/${product.images[0].name}`
                    : "/images/default.jpg"
                }
                alt={`${product.make || "Marca desconocida"} ${
                  product.model || "Modelo desconocido"
                }`}
                className="img-fluid"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="details">
              <h1 className="product-detail-title">
                {product.make?.name || "Marca desconocida"}{" "}
                {product.model?.name || "Modelo desconocido"}
              </h1>
              <p>{product.mileage ? `${product.mileage} km` : "Kilometraje no disponible"}</p>
              <p className="price">
                u$d {product.price ? product.price.toLocaleString() : "No disponible"}
              </p>
              <a href="#" className="btn btn-outline-secondary">
                Simulá tu financiamiento &gt;
              </a>
              <hr />
              <p>Año: {product.year || "No especificado"}</p>
              <p>Transmisión: {product.transmission?.name || "No especificada"}</p>
              <p>{product.description || "Descripción no disponible"}</p>
              <a href="#" className="btn btn-primary btn-block">
                Reservar o Agendar visita
              </a>
            </div>
          </div>
        </div>
      </div>
      </section>
    </main>
  );
};

export default Detail;