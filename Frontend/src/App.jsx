import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Detail from './pages/Detail';
import AboutUs from './pages/AboutUs';
import AuthPage from './pages/AuthPage';
import Profile from './pages/Profile';
import ProductList from './pages/ProductList';
import Admin from './pages/Admin';
import ProductEdit from './pages/AdminEdit';
import CreateProduct from './pages/ProductAdd';
import Cart from './pages/ProductCart';


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
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/products/add" element={<CreateProduct />} />
          <Route path="/products/edit/:id" element={<ProductEdit />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App
