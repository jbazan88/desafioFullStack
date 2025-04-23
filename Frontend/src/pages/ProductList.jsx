import React from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = React.useState([]);

  // Obtener productos desde la API
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
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
                      src={
                        product.images?.length
                          ? `/images/products/${product.images[0].name}`
                          : "/images/default.jpg"
                      }
                      alt={`Imagen de ${product.make || "Marca desconocida"} ${
                        product.model || "Modelo desconocido"
                      }`}
                    />
                  </figure>
                  <article className="position-relative ps-3">
                    <p className="product-year">Año: {product.year}</p>
                    <p className="product-brand">
                      <b>
                        {product.make || "Marca desconocida"}{" "}
                        {product.model || "Modelo desconocido"}
                      </b>
                    </p>
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
      <div className="container d-flex justify-content-end">
        <a href="/admin">Volver a la lista</a>
      </div>
    </main>
  );
};

export default ProductList;