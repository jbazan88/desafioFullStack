import React from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = React.useState([]);

  // Obtener productos desde la API
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error al obtener los productos:", error));
  }, []);

  // Función para formatear números con separador de miles
  const toThousand = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <main>
      <div className="container products-wrapper">
        <div className="row">
          {products.map((product) => (
            <div className="col-12 col-sm-6 col-lg-3 my-5" key={product.id}>
              <section className="card h-100 shadow">
                <a
                  href={`/products/${product.id}`}
                  className="text-decoration-none text-reset"
                >
                  <figure className="product-box_image">
                  <img
                    width="80%"
                    className="card-img-top"
                    src={`http://localhost:3000/uploads/products/${product.images?.[0]?.name || '/images/default.jpg'}`}
                    alt={`Imagen de ${product.make?.name || 'Marca desconocida'} ${product.model?.name || 'Modelo desconocido'}`}
                  />
                  </figure>
                  <article className="position-relative ps-3">
                  <p className="product-brand">
                    {product.make?.name || "Marca desconocida"}{" "}
                    {product.model?.name || "Modelo desconocido"}
                    </p>
                    <p className="product-year">Año: {product.year}</p>
                    <p className="product-price">
                      u$d {toThousand(product.price)}
                    </p>
                  </article>
                </a>
              </section>
            </div>
          ))}
        </div>
      </div>
      </main>
  );
};

export default ProductList;