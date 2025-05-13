import React from "react";
import Menu from "../components/Menu";

const ProductAdd = () => {
return (
    <main>
        <section className="container products-wrapper">
            <div className="container row text-center py-3 mx-auto">
                <h1>Agregar producto</h1>
                <div className="col-12 col-md-8 mx-auto">
                    <section className="card h-100 shadow bg-white">
                    <Menu />
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

export default ProductAdd;