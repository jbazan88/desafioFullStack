import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
function App() {

  return (
    <Router>
      <Header />
      <main>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App
