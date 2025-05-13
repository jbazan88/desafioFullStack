import React from 'react';
import Slider from 'react-slick';
import { Container, Row, Col } from 'react-bootstrap';

const HeroCarousel = () => {
    const settings = {
        dots: true,         // Muestra los puntos de navegación
        infinite: true,     // Permite el carrusel infinito
        speed: 500,         // Velocidad de la transición en ms
        slidesToShow: 1,    // Número de slides a mostrar a la vez
        slidesToScroll: 1,  // Número de slides a desplazar al navegar
        autoplay: true,      // Reproducción automática
        autoplaySpeed: 3000, // Velocidad de reproducción automática en ms
        pauseOnHover: true,  // Pausa al pasar el mouse
        };

    const slidesData = [
        {
            id: 1,
            title: 'Toyota Corolla',
            description: 'Conocé todo acerca del Corolla 2025, el ícono de los sedanes en su mejor versión. El vehículo que representa la calidad Toyota, ahora con más tecnología, seguridad y diseño moderno.',
            imageUrl: '/banner_img_01.png', 
            linkUrl: '/products/10'
        },
        {
            id: 2,
            title: 'Volkswagen Vento',
            description: 'Innovador en cada detalle: diseño refinado, faros y luces traseras LED en todas las versiones, motor TSI, tecnología de última generación y confort.',
            imageUrl: '/banner_img_02.png',
            linkUrl: '/products/4'
        },
        {
            id: 3,
            title: 'Chevrolet Cruze',
            description: 'Un vehículo ágil y moderno, ideado para brindarte la mejor tecnología, en cualquier dirección que tomes.',
            imageUrl: '/banner_img_03.png',
            linkUrl: '/products/3'
        },
    ];

    return (
        <div className="carousel">
      <Container>
        <Slider {...settings}>
          {slidesData.map((slide) => (
            <Row className="p-5 align-items-center carousel-row"  key={slide.id}>
              <Col md={6} className="order-md-first">
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                <a href={slide.linkUrl} className="btn btn-primary">
                  Ver más
                </a>
              </Col>
              <Col md={6} className="order-md-last">
                <img
                  className="img-fluid rounded"
                  src={slide.imageUrl}
                  alt={`Imagen de ${slide.title}`}
                />
              </Col>
            </Row>
          ))}
        </Slider>
      </Container>
    </div>

    );
};

export default HeroCarousel;