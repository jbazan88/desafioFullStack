import React, { useState } from "react";
import axios from "axios";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Alternar entre login y registro
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Limpiar errores previos

    try {
      if (isLogin) {
        // Login
        const response = await axios.post("http://localhost:3000/users/processLogin", {
          email: formData.email,
          password: formData.password,
        });
        console.log("Login exitoso:", response.data);
        alert("Login exitoso");
      } else {
        // Registro
        const response = await axios.post("http://localhost:3000/users/processRegister", {
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          password: formData.password,
          password2: formData.password2,
        });
        console.log("Registro exitoso:", response.data);
        alert("Registro exitoso");
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors.reduce((acc, err) => {
          acc[err.param] = err.msg;
          return acc;
        }, {}));
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="container card-body py-3">
      <section className="bg-light rounded px-4">
        <div className="card-body py-1">
          <ul className="nav nav-pills nav-justified mb-3">
            <li className="nav-item">
              <button
                className={`nav-link ${isLogin ? "active" : ""}`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${!isLogin ? "active" : ""}`}
                onClick={() => setIsLogin(false)}
              >
                Registro
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="form-outline">
                  <label className="form-label pt-2">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.name}</div>
                </div>
                <div className="form-outline">
                  <label className="form-label pt-2">Apellido</label>
                  <input
                    type="text"
                    name="surname"
                    className={`form-control ${errors.surname ? "is-invalid" : ""}`}
                    value={formData.surname}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.surname}</div>
                </div>
              </>
            )}
            <div className="form-outline">
              <label className="form-label pt-2">Email</label>
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={formData.email}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.email}</div>
            </div>
            <div className="form-outline">
              <label className="form-label pt-2">Contraseña</label>
              <input
                type="password"
                name="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                value={formData.password}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.password}</div>
            </div>
            {!isLogin && (
              <div className="form-outline">
                <label className="form-label pt-2">Reingresar Contraseña</label>
                <input
                  type="password"
                  name="password2"
                  className={`form-control ${errors.password2 ? "is-invalid" : ""}`}
                  value={formData.password2}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.password2}</div>
              </div>
            )}
            <div className="text-center pt-3">
              <button type="submit" className="btn btn-primary btn-block mb-4">
                {isLogin ? "Ingresar" : "Registrarse"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AuthPage;