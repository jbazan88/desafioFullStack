import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Detail from './pages/Detail';
import AboutUs from './pages/AboutUs';
import AuthPage from './pages/AuthPage';
import ProductList from './pages/ProductList';
import ProductEdit from './pages/ProductEdit';

function App() {

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<Detail />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/user" element={<AuthPage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id/edit" element={<ProductEdit />} />
          {/* <Route path="/products/cart" element={<Cart />} /> */}
          {/* <Route path="/products/search" element={<SearchResults />} /> */}
          {/* <Route path="/admin" element={<Admin />} /> */}
          {/* <Route path="/admin/products" element={<AdminProducts />} /> */}
          {/* <Route path="/admin/users" element={<AdminUsers />} /> */}
          {/* <Route path="/admin/products/:id/edit" element={<EditProduct />} /> */}
          {/* <Route path="/admin/products/create" element={<CreateProduct />} /> */}
          {/* <Route path="/admin/users/:id/edit" element={<EditUser />} /> */}
          {/* <Route path="/admin/users/create" element={<CreateUser />} /> */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App
