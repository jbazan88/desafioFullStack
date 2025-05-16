import React from 'react';

const Footer = () => {
  return (
    <footer className="secondary" id="dark_footer">
      <div className="container">
        <div className="row">

          <div className="col-md-4 pt-5">
            <h2 className="h2 text-primary border-bottom pb-3 border-light logo">RoyalCars</h2>
            <ul className="list-unstyled text-dark footer-link-list">
              <li>
                <i className="fas fa-map-marker-alt fa-fw"></i>
                Calle Falsa 123
              </li>
              <li>
                <i className="fa fa-phone fa-fw"></i>
                <a className="text-decoration-none" href="tel:0800-800-0123">0800-800-0123</a>
              </li>
              <li>
                <i className="fa fa-envelope fa-fw"></i>
                <a className="text-decoration-none" href="mailto:info@company.com">info@royalcars.com</a>
              </li>
            </ul>
          </div>

          <div className="col-md-4 pt-5">
<h2 className="h2 text-white border-bottom pb-3 border-light"> PROXIMAMENTE</h2>
          </div>

          <div className="col-md-4 pt-5">
            <h2 className="h2 text-dark border-bottom pb-3 border-light">Ayuda</h2>
            <ul className="list-unstyled text-dark footer-link-list">
              <li><a className="text-decoration-none" href="/">Inicio</a></li>
              <li><a className="text-decoration-none" href="/user">Login</a></li>
              <li><a className="text-decoration-none" href="aboutUs">Sobre Nosotros</a></li>
            </ul>
          </div>

        </div>

        <div className="row text-white mb-4">
          <div className="col-12 mb-3">
            <div className="w-100 my-3 border-top border-light"></div>
          </div>
          <div className="col-auto me-auto">
            <ul className="list-inline text-left footer-icons">
              <li className="list-inline-item border border-light rounded-circle text-center">
                <a className="text-dark text-decoration-none" target="_blank" rel="noopener noreferrer" href="http://facebook.com/">
                  <i className="fab fa-facebook-f fa-lg fa-fw"></i>
                </a>
              </li>
              <li className="list-inline-item border border-light rounded-circle text-center">
                <a className="text-dark text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/">
                  <i className="fab fa-instagram fa-lg fa-fw"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-auto">
            <label className="sr-only text-white" htmlFor="subscribeEmail">Email</label>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control bg-dark border-light"
                id="subscribeEmail"
                placeholder="Email"
              />
              <div className="input-group-text btn-success">Subscribe</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;