import React from "react";

const AboutUs = () => {
    return (
<main>
            <section className="bg-white py-5">
                <div className="container">
                    <div className="row align-items-center py-5">
                        <div className="col-md-5 text-black">
                            <h1>Sobre nosotros</h1>
                            <p>
                                Nuestro equipo está formado por profesionales altamente capacitados y apasionados por
                                los automóviles. Desde nuestros asesores de ventas hasta nuestros técnicos
                                especializados, cada miembro de RoyalCars está comprometido con brindar un servicio
                                excepcional y personalizado a cada cliente.
                            </p>
                        </div>
                        <div className="col-md-4">
                            <img src="/Royal-hero.png" alt="About Hero" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-light py-5">
                <div className="container my-4">
                    <div className="row text-center py-3">
                        <div className="col-lg-6 m-auto">
                            <h1 className="h1">Nuestras marcas</h1>
                        </div>
                        <div className="col-lg-9 m-auto tempaltemo-carousel">
                            <div className="row d-flex flex-row">
                                <div className="carousel-item active">
                                    <div className="row">
                                        <div className="col-3 p-md-5">
                                            <a href="#"><img className="img-fluid brand-img" src="/brand_01.png"
                                                    alt="Brand Logo" /></a>
                                        </div>
                                        <div className="col-3 p-md-5">
                                            <a href="#"><img className="img-fluid brand-img" src="/brand_02.png"
                                                    alt="Brand Logo" /></a>
                                        </div>
                                        <div className="col-3 p-md-5">
                                            <a href="#"><img className="img-fluid brand-img" src="/brand_03.png"
                                                    alt="Brand Logo" /></a>
                                        </div>
                                        <div className="col-3 p-md-5">
                                            <a href="#"><img className="img-fluid brand-img" src="/brand_04.png"
                                                    alt="Brand Logo" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUs;