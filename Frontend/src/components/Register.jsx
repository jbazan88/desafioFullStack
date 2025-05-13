import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        password2: ""
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post("http://localhost:3000/users/processRegister", formData);
            console.log("Registro exitoso:", response.data);
            alert("Registro exitoso");
            window.location.href = "/";
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(
                    error.response.data.errors.reduce((acc, err) => {
                        acc[err.param] = err.msg;
                        return acc;
                    }, {})
                );
            } else {
                console.error("Error:", error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
                    autoComplete="new-password"
                />
                <div className="invalid-feedback">{errors.password}</div>
            </div>
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
            <div className="text-center pt-3">
                <button type="submit" className="btn btn-primary btn-block mb-4" disabled={isSubmitting}>
                    Registrarse
                </button>
            </div>
        </form>
    );
};

export default Register;