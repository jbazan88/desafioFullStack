import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DropdownMenu = ({ name, label, value, onChange, options, placeholder = `Seleccionar ${label}` }) => (
  <div className="mb-3">
    <label className="form-label" htmlFor={name}>{label}:</label>
    <select
      className="form-select"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((option) => (
        <option key={option.id || option} value={option.id || option}>
          {option.name || option.country || option}
        </option>
      ))}
    </select>
  </div>
);

const MenuEdit = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const dropdownResponse = await axios.get("http://localhost:3000/api/dropdowns");
        setDropdownData(dropdownResponse.data);
      } catch (error) {
        console.error("Error al obtener los datos de los dropdowns:", error);
      }
    };

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        const p = res.data;
        setProduct({
          make: p.makeId || p.make?.id || "",
          model: p.patternId || p.model?.id || "",
          state: p.stateId || p.state?.id || "",
          category: p.categoryId || p.category?.id || "",
          year: p.year || "",
          mileage: p.mileage || "",
          price: p.price || "",
          transmission: p.transmissionId || p.transmission?.id || "",
          origin: p.originId || p.origin?.id || "",
          description: p.description || "",
        });
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    fetchDropdownData();
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(product).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (image) {
        formData.append('image', image);
      }

      await axios.put(`http://localhost:3000/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Producto editado con éxito");
      navigate("/admin");
    } catch (error) {
      console.error("Error al editar el producto:", error);
    }
  };

  return (
    <div className="card-body">
      <form className="row" onSubmit={handleSubmit}>
        {/* Marca */}
        <div className="col-12 col-md-6">
          <DropdownMenu
            name="make"
            label="Marca"
            value={product.make}
            onChange={handleChange}
            options={dropdownData.makes}
          />
        </div>
        {/* Modelo */}
        <div className="col-12 col-md-6">
          <DropdownMenu
            name="model"
            label="Modelo"
            value={product.model}
            onChange={handleChange}
            options={dropdownData.models}
          />
        </div>
        {/* Estado */}
        <div className="col-12 col-md-6">
          <DropdownMenu
            name="state"
            label="Estado"
            value={product.state}
            onChange={handleChange}
            options={dropdownData.states}
          />
        </div>
        {/* Categoría */}
        <div className="col-12 col-md-6">
          <DropdownMenu
            name="category"
            label="Categoría"
            value={product.category}
            onChange={handleChange}
            options={dropdownData.categories}
          />
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
        <div className="col-12 col-md-6">
          <DropdownMenu
            name="transmission"
            label="Transmisión"
            value={product.transmission}
            onChange={handleChange}
            options={dropdownData.transmissions}
          />
        </div>
        {/* Origen */}
        <div className="col-12 col-md-6">
          <DropdownMenu
            name="origin"
            label="Origen"
            value={product.origin}
            onChange={handleChange}
            options={dropdownData.origins}
          />
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
            <label className="btn btn-secondary" htmlFor="image">
              Cambiar imagen
            </label>
            <input
              type="file"
              id="image"
              name="image"
              hidden
              onChange={e => setImage(e.target.files[0])}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuEdit;