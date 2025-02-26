import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./category.scss";
import ShowDisplay from "../../components/showdisplay/showdisplay";
import SortDropdown from "../../components/sort/sort";
import movieAPI from "../../services/movieAPI";
import FilmListColumn from "../../components/FilmListColumn/FilmListColumn";
import Pagination from "../../components/pagination/pagination";

// Hàm chuyển tên thể loại thành slug
function toSlug(name) {
    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
}

// Hàm chuyển đổi slug thành dạng đẹp
function formatSlug(slug) {
    return slug
        .split("-") // Tách chuỗi theo dấu '-'
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ cái đầu mỗi từ
        .join(" "); // Ghép lại thành chuỗi hoàn chỉnh
}

const CategoryPage = () => {
    const {type, slug} = useParams(); // Lấy tham số từ URL
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(40); // Giả định có 40 trang
    const [genreMap, setGenreMap] = useState({}); // Lưu danh sách ánh xạ thể loại từ API
    const [countryMap, setCountryMap] = useState({}); // Lưu danh sách ánh xạ quốc gia từ API
    const sortOptions = [
        {value: "new", label: "Phim mới nhất"},
        {value: "popular", label: "Phim xem nhiều nhất"},
        {value: "rated", label: "Phim đánh giá cao nhất"},
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/movies/get_thinhhanh/`);
                const data = await response.json();
                setFilms(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug, type]); // Khi `slug` hoặc `type` thay đổi, gọi lại API lấy phim mới

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/core/genres/");
                const data = await response.json();

                const mappedGenres = {};
                data.forEach((genre) => {
                    mappedGenres[toSlug(genre.name)] = genre.name;
                });

                setGenreMap(mappedGenres);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách thể loại:", error);
            }
        };

        const fetchCountries = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/core/nations/");
                const data = await response.json();

                const mappedCountries = {};
                data.forEach((country) => {
                    mappedCountries[toSlug(country.name)] = country.name;
                });

                setCountryMap(mappedCountries);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách quốc gia:", error);
            }
        };

        fetchGenres();
        fetchCountries();
    }, []); // Chỉ cần gọi 1 lần khi component mount (vì danh sách thể loại & quốc gia không đổi)

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div id="category_page">
            <ShowDisplay />
            <div className="category_page__header">
                <h2 className="category_page__title">{type === "genre" ? `Thể loại: ${genreMap[slug] || formatSlug(slug)}` : `Quốc gia: ${countryMap[slug] || formatSlug(slug)}`}</h2>
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
