import React, {useEffect, useState} from "react";
import "./genre.scss";
import ShowDisplay from "../../components/showdisplay/showdisplay";
import SortDropdown from "../../components/sort/sort";
import {fetchDisplayList, fetchFilmData} from "../../services/movieAPI";
import FilmListColumn from "../../components/FilmListColumn/FilmListColumn";
import Pagination from "../../components/pagination/pagination";

const GenrePage = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(40); // Assuming there are 40 pages

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
        <div id="genre">
            <ShowDisplay />
            <div className="genre__header">
                <h1 className="genre__title">Thể loại</h1>
                <SortDropdown options={sortOptions} />
            </div>
            <div className="listFilm">{loading ? <p>Loading...</p> : error ? <p>{error}</p> : <FilmListColumn films={films} />}</div>
            <div className="pagination_container">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default GenrePage;
