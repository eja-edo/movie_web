import React from "react";
import "./App.css";

import {BrowserRouter, Routes, Route} from "react-router-dom";

import TrangChu from "./pages/home/TrangChu.js";
import Login from "./pages/login/login.js";
import Film from "./pages/film/film.js";
import MovieDetails from "./pages/detail/detail.js";
import Nav from "./components/nav/nav.js";
import FooterComponents from "./components/footer/footer.js";
import Filter from "./pages/filter/filter.js";
import GenrePage from "./pages/genre/genre.js";
import CountryPage from "./pages/country/country.js";

import Intro from "./pages/intro/intro.js";

function App() {
    return (
        <BrowserRouter>
            <Nav /> {/* Navbar is usually outside the Routes to be visible on all pages */}
            <Routes>
                <Route path="/" element={<Intro />} /> {/* Home Page */}
                <Route path="/TrangChu" element={<TrangChu />} /> {/* Home Page */}
                <Route path="/login" element={<Login />} />
                <Route path="/film/:id1/:id2" element={<Film />} /> Assumed route for films listing
                <Route path="/detail/:id" element={<MovieDetails />} /> {/* Route for individual film details */}
                <Route path="/r/:listFilm" element={<Filter />} />
                <Route path="/intro" element={<Intro />} />
                <Route path="/genre" element={<GenrePage />} /> {/* Trang thể loại */}
                <Route path="/country" element={<CountryPage />} /> {/* Trang thể loại */}
                {/* You can add more routes here for other pages/components */}
            </Routes>
            <FooterComponents />
        </BrowserRouter>
    );
}

export default App;
