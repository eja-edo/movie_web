import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./category.scss";
import ShowDisplay from "../../components/showdisplay/showdisplay";
import SortDropdown from "../../components/sort/sort";
import {fetchDisplayList, fetchFilmData} from "../../services/movieAPI";
import FilmListColumn from "../../components/FilmListColumn/FilmListColumn";
import Pagination from "../../components/pagination/pagination";

const CategoryPage = () => {
    const {type} = useParams(); // Lấy tham số từ URL
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(40); // Giả định có 40 trang

    const sortOptions = [
        {value: "new", label: "Phim mới nhất"},
        {value: "popular", label: "Phim xem nhiều nhất"},
        {value: "rated", label: "Phim đánh giá cao nhất"},
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/service/get_thinhhanh/");
                const data = await response.json();
                setFilms(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div id="category_page">
            <ShowDisplay />
            <div className="category_page__header">
                <h1 className="category_page__title">{type === "genre" ? "Thể loại" : "Quốc gia"}</h1>
                <SortDropdown options={sortOptions} />
            </div>
            <div className="listFilm">{loading ? <p>Loading...</p> : error ? <p>{error}</p> : <FilmListColumn films={films} />}</div>
            <div className="pagination_container">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default CategoryPage;
