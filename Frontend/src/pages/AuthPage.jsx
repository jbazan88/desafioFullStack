import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

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
                    {isLogin ? <Login /> : <Register />}
                </div>
            </section>
        </div>
    );
};

export default AuthPage;