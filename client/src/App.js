import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TrangChu from './pages/home/TrangChu.js';
import Login from './pages/login/login.js';
import Film from './pages/film/film.js';
import MovieDetails from './pages/detail/detail.js'
import Nav from './components/nav/nav.js'
import FooterComponents from './components/footer/footer.js'

function App() {
  return (
    <BrowserRouter>
      <Nav /> {/* Navbar is usually outside the Routes to be visible on all pages */}
      <Routes>
        <Route path="/" element={<TrangChu />} /> {/* Home Page */}
        <Route path="/TrangChu" element={<TrangChu />} /> {/* Home Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/film/:id1/:id2" element={<Film />} /> Assumed route for films listing
        <Route path="/detail/:id" element={<MovieDetails />} /> {/* Route for individual film details */}
        {/* You can add more routes here for other pages/components */}
      </Routes>
      <FooterComponents />
    </BrowserRouter>
  );
}

export default App;