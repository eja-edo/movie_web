import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TrangChu from './components/TrangChu';
import Login from './components/login';
import Film from './components/film';
import MovieDetails from './components/detail';
import Nav from './components/nav';

function App() {
  return (
    <BrowserRouter>
      <Nav /> {/* Navbar is usually outside the Routes to be visible on all pages */}
      <Routes>
        <Route path="/" element={<TrangChu />} /> {/* Home Page */}
        <Route path="/TrangChu" element={<TrangChu />} /> {/* Home Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/film/:id" element={<Film />} /> {/* Assumed route for films listing */}
        <Route path="/detailfilms/:id" element={<MovieDetails />} /> {/* Route for individual film details */}
        {/* You can add more routes here for other pages/components */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;