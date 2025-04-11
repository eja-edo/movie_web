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
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const genre_id = searchParams.get("genre_id");
    const nation_id = searchParams.get("nation_id");
    const director_id = searchParams.get("director_id");
    const actor_id = searchParams.get("actor_id");
    const searchQuery = searchParams.get("q");
    const order_by = searchParams.get("order_by") || "-release_date";
    const page = searchParams.get("page") || "1";

    const sortOptions = [
        {label: "Ngày phát hành (Mới nhất)", value: "-release_date"},
        {label: "Tiêu đề (A-Z)", value: "title"},
        {label: "Đánh giá (Cao nhất)", value: "-rating"},
        {label: "Lượt xem (Nhiều nhất)", value: "-views"},
    ];

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                let apiUrl = `${process.env.REACT_APP_API_URL}/api/movies/`;

                // Xử lý trường hợp tìm kiếm
                if (location.pathname === "/search" && searchQuery) {
                    const url = new URL(`${process.env.REACT_APP_API_URL}/api/movies/search_full_movies/`);
                    url.searchParams.append("q", searchQuery);
                    url.searchParams.append("page", page);
                    apiUrl = url.toString();
                    setTitle(`Kết quả tìm kiếm cho: "${searchQuery}"`);
                } else {
                    // Xác định loại dữ liệu cần lấy dựa trên `type`
                    if (type === "genre") apiUrl += "genres/";
                    else if (type === "nation") apiUrl += "nations/";
                    else if (type === "directors") apiUrl += "directors/";
                    else if (type === "actors") apiUrl += "actors/";
                    else throw new Error("Loại danh mục không hợp lệ!");

                    const url = new URL(apiUrl);
                    if (genre_id) url.searchParams.append("genre_id", genre_id);
                    if (nation_id) url.searchParams.append("nation_id", nation_id);
                    if (director_id) url.searchParams.append("director_id", director_id);
                    if (actor_id) url.searchParams.append("actor_id", actor_id);
                    url.searchParams.append("order_by", order_by);
                    url.searchParams.append("page", page);
                    apiUrl = url.toString();
                }

                console.log("Current page:", page);
                console.log("Fetching data from:", apiUrl);
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error(`Lỗi API: ${response.status}`);
                const data = await response.json();
                console.log("Received data:", data);

                if (location.pathname !== "/search") {
                    setTitle(
                        typeof data.Title === "object"
                            ? Object.entries(data.Title)
                                  .map(([key, value]) => `${key}: ${value}`)
                                  .join(", ")
                            : data.Title || "Không xác định"
                    );
                }

                // Đảm bảo cập nhật state với dữ liệu mới
                if (data.results) {
                    console.log("Updating films with new data:", data.results);
                    setFilms([...data.results]); // Tạo một mảng mới để đảm bảo React nhận ra sự thay đổi
                } else {
                    setFilms([]);
                }
                setCurrentPage(parseInt(page) || 1);
                setTotalPages(data.total_pages || 1);
            } catch (error) {
                console.error("Error fetching data:", error);
                if (error.name !== "AbortError") {
                    setError(error.message);
                    setFilms([]);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [location.pathname, location.search, type, genre_id, nation_id, director_id, actor_id, order_by, page, searchQuery]);

    const handlePageChange = (newPage) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("page", newPage);
        setSearchParams(newSearchParams);
    };

    // Thêm useEffect để theo dõi sự thay đổi của films
    useEffect(() => {
        console.log("Films state updated:", films);
    }, [films]);

    return (
        <>
            <div id="category_page__container">
                <div className="showdisplay__wrapper">
                    <ShowDisplay />
                </div>

                <div className="category_page">
                    <div className="category_page__header">
                        <h2 className="category_page__title">{title || "Đang tải..."}</h2>
                        <SortDropdown options={sortOptions} />
                    </div>
                    <div className="listFilm">{loading ? <p>Loading...</p> : error ? <p>{error}</p> : films.length ? <FilmListColumn films={films} /> : <p>Không có phim nào được tìm thấy.</p>}</div>
                    <div className="pagination_container">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryPage;
