import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
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
            const response = await axios.post("http://localhost:3000/users/processLogin", formData);
            console.log("Login exitoso:", response.data);
            alert("Login exitoso");
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
                    autoComplete="current-password"
                />
                <div className="invalid-feedback">{errors.password}</div>
            </div>
            <div className="text-center pt-3">
                <button type="submit" className="btn btn-primary btn-block mb-4" disabled={isSubmitting}>
                    Ingresar
                </button>
            </div>
        </form>
    );
};

export default Login;