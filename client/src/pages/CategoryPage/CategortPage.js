import React, {useEffect, useState} from "react";
import {useLocation, useParams, useSearchParams, useNavigate} from "react-router-dom";
import "./category.scss";
import ShowDisplay from "../../components/showdisplay/showdisplay";
import SortDropdown from "../../components/sort/sort";
import FilmListColumn from "../../components/FilmListColumn/FilmListColumn";
import Pagination from "../../components/pagination/pagination";

const CategoryPage = () => {
    const {type} = useParams();
    const [films, setFilms] = useState([]);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const location = useLocation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const genre_id = searchParams.get("genre_id");
    const country_id = searchParams.get("country_id");
    const order_by = searchParams.get("order_by") || "-rating";
    const page = searchParams.get("page") || "1";

    const sortOptions = [
        {label: "Tiêu đề (A-Z)", value: "title"},
        {label: "Ngày phát hành (Mới nhất)", value: "-release_date"},
        {label: "Đánh giá (Cao nhất)", value: "-rating"},
        {label: "Lượt xem (Nhiều nhất)", value: "-views"},
    ];

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = new URL(`${process.env.REACT_APP_API_URL}/api/movies/${type === "genre" ? "genres" : "nations"}/`);
                if (genre_id) url.searchParams.append("genre_id", genre_id);
                if (country_id) url.searchParams.append("nation_id", country_id);
                url.searchParams.append("order_by", order_by);
                url.searchParams.append("page", page);

                const response = await fetch(url);
                if (!response.ok) throw new Error(`Lỗi API: ${response.status}`);
                const data = await response.json();

                setTitle(
                    typeof data.Title === "object"
                        ? Object.entries(data.Title)
                              .map(([key, value]) => `${key}: ${value}`)
                              .join(", ")
                        : data.Title || "Không xác định"
                );

                setFilms(data.results || []);
                setCurrentPage(data.page || 1);
                setTotalPages(data.total_pages || 1);
            } catch (error) {
                if (error.name !== "AbortError") {
                    setError(error.message);
                    setFilms([]);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [location.search, type, genre_id, country_id, order_by, page]);

    const handlePageChange = (newPage) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("page", newPage);
        navigate(`${location.pathname}?${searchParams.toString()}`);
    };

    return (
        <div id="category_page">
            <ShowDisplay />
            <div className="category_page__header">
                <h2 className="category_page__title">{title || "Đang tải..."}</h2>
                <SortDropdown options={sortOptions} />
            </div>
            <div className="listFilm">{loading ? <p>Loading...</p> : error ? <p>{error}</p> : films.length ? <FilmListColumn films={films} /> : <p>Không có phim nào được tìm thấy.</p>}</div>
            <div className="pagination_container">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default CategoryPage;
