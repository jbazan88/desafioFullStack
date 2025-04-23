import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductEdit = () => {
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const navigate = useNavigate(); // Para redirigir después de guardar
  const [product, setProduct] = useState({
    make: "",
    model: "",
    state: "",
    category: "",
    year: "",
    mileage: "",
    price: "",
    transmission: "",
    origin: "",
    description: "",
  });
  const [dropdownData, setDropdownData] = useState({
    makes: [],
    models: [],
    states: [],
    categories: [],
    transmissions: [],
    origins: [],
  });

  // Obtener datos del producto y listas desplegables
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, dropdownResponse] = await Promise.all([
          axios.get(`http://localhost:3000/api/products/${id}`),
          axios.get("http://localhost:3000/api/products/dropdowns"),
        ]);

        setProduct(productResponse.data);
        setDropdownData(dropdownResponse.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [id]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/products/${id}`, product);
      alert("Producto actualizado con éxito");
      navigate("/admin"); // Redirigir a la lista de productos
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  return (
    <main>
      <section className="container products-wrapper">
        <div className="container row text-center py-3 mx-auto">
          <h1>Editar producto</h1>
          <div className="col-12 col-md-8 mx-auto">
            <section className="card h-100 shadow bg-white">
              <div className="card-body">
                <form className="row" onSubmit={handleSubmit}>
                  {/* Marca */}
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label" htmlFor="make">Marca:</label>
                    <select
                      className="form-select"
                      name="make"
                      value={product.make}
                      onChange={handleChange}
                    >
                      {dropdownData.makes.map((make) => (
                        <option key={make.id} value={make.id}>
                          {make.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Modelo */}
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label" htmlFor="model">Modelo:</label>
                    <select
                      className="form-select"
                      name="model"
                      value={product.model}
                      onChange={handleChange}
                    >
                      {dropdownData.models.map((model) => (
                        <option key={model.id} value={model.id}>
                          {model.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Estado */}
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label" htmlFor="state">Estado:</label>
                    <select
                      className="form-select"
                      name="state"
                      value={product.state}
                      onChange={handleChange}
                    >
                      {dropdownData.states.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Categoría */}
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label" htmlFor="category">Categoría:</label>
                    <select
                      className="form-select"
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                    >
                      {dropdownData.categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Año */}
                  <div className="col-12 col-md-4 mb-3">
                    <label className="form-label" htmlFor="year">Año:</label>
                    <input
                      className="form-control"
                      id="year"
                      name="year"
                      type="number"
                      value={product.year}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Kilometraje */}
                  <div className="col-12 col-md-4 mb-3">
                    <label className="form-label" htmlFor="mileage">Kilometraje:</label>
                    <input
                      className="form-control"
                      id="mileage"
                      name="mileage"
                      type="number"
                      value={product.mileage}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Precio */}
                  <div className="col-12 col-md-4 mb-3">
                    <label className="form-label" htmlFor="price">Precio:</label>
                    <input
                      className="form-control"
                      id="price"
                      name="price"
                      type="number"
                      value={product.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Transmisión */}
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label" htmlFor="transmission">Transmisión:</label>
                    <select
                      className="form-select"
                      name="transmission"
                      value={product.transmission}
                      onChange={handleChange}
                    >
                      {dropdownData.transmissions.map((transmission) => (
                        <option key={transmission.id} value={transmission.id}>
                          {transmission.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Origen */}
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label" htmlFor="origin">Origen:</label>
                    <select
                      className="form-select"
                      name="origin"
                      value={product.origin}
                      onChange={handleChange}
                    >
                      {dropdownData.origins.map((origin) => (
                        <option key={origin.id} value={origin.id}>
                          {origin.country}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Descripción */}
                  <div className="col-12 mb-3">
                    <label className="form-label" htmlFor="description">Descripción:</label>
                    <textarea
                      name="description"
                      className="form-control"
                      style={{ resize: "none" }}
                      value={product.description}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Botones */}
                  <div className="col-12 d-flex justify-content-around">
                    <div>
                      <label className="btn btn-secondary" htmlFor="image">Cambiar imagen</label>
                      <input type="file" id="image" name="image" hidden />
                    </div>
                    <button className="btn btn-primary" type="submit">Guardar Cambios</button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
        <div className="container d-flex justify-content-end">
          <a href="/admin">Volver a la lista</a>
        </div>
      </section>
    </main>
  );
};

export default ProductEdit;