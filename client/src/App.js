import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import TrangChu from "./pages/home/TrangChu.js";
import Login from "./pages/login/login.js";
import Film from "./pages/film/film.js";
import MovieDetails from "./pages/detail/detail.js";
import Nav from "./components/nav/nav.js";
import FooterComponents from "./components/footer/footer.js";
import Filter from "./pages/filter/filter.js";
import Page404 from "./pages/page404/page404.js";
import Timkiem from "./pages/pagetk/timkiem.js";
import Intro from "./pages/intro/intro.js";
import TTcon from "./pages/pagecontintuc/contintuc.js";
import CategoryPage from "./pages/CategoryPage/CategortPage.js";
import NewsScrip from "./pages/news/newsScrip.js";

function App() {

    return (
        <BrowserRouter>
            <Nav /> {/* Navbar is usually outside the Routes to be visible on all pages */}
            <Routes>
                <Route path="/" element={<TrangChu />} /> {/* Home Page */}
                <Route path="/TrangChu" element={<TrangChu />} /> {/* Home Page */}
                <Route path="/login" element={<Login />} />
                <Route path="/film/:id1/:id2" element={<Film />} />
                <Route path="/newsScrip" element={<NewsScrip />} /> <Route path="/detail/:id" element={<MovieDetails />} /> {/* Route for individual film details */}
                <Route path="/r/:listFilm" element={<Filter />} />
                <Route path="/ttcon/:id" element={<TTcon />} />
                <Route path="/intro" element={<Intro />} />
                <Route path="/page404" element={<Page404 />} />
                <Route path="/category/:type" element={<CategoryPage key={window.location.pathname} />} />
                {/* Trang thể loại */}
                {/* You can add more routes here for other pages/components */}
            </Routes>
            <FooterComponents />
        </BrowserRouter>
    );

}

export default App;
