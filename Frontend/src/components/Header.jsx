import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container d-flex justify-content-between align-items-center">

          <Link className="navbar-brand text-primary logo h1 align-self-center" to="/">
            RoyalCars
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main_nav"
            aria-controls="main_nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between" id="main_nav">
            <div className="flex-fill">
              <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/products">Comprar</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/aboutUs">Sobre Nosotros</Link>
                </li>
              </ul>
            </div>
            <div className="navbar align-self-center d-flex">
              <div className="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="inputMobileSearch"
                    placeholder="Search ..."
                  />
                  <div className="input-group-text">
                    <i className="fa fa-fw fa-search"></i>
                  </div>
                </div>
              </div>
              <Link className="nav-icon d-none d-lg-inline" to="#" data-bs-toggle="modal" data-bs-target="#nav_search">
                <i className="fa fa-fw fa-search text-dark mr-2"></i>
              </Link>
              <Link className="nav-icon position-relative text-decoration-none" to="/products/cart">
                <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
              </Link>
              <Link className="nav-icon position-relative text-decoration-none" to="/users/logout">
                <i className="fa fa-fw fa-sign-out-alt text-dark mr-3"></i>
              </Link>
              <Link className="nav-icon position-relative text-decoration-none" to="/user">
                <i className="fa fa-fw fa-user text-dark mr-3"></i>
              </Link>
            </div>
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Header;