import React, {useEffect, useState} from "react";
import "./myList.scss";
import ShowDisplay from "../../components/showdisplay/showdisplay";
import Pagination from "../../components/pagination/pagination";
import FilmListColumn from "../../components/FilmListColumn/FilmListColumn";
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {FaHeart, FaPlus, FaClock, FaUser, FaSignOutAlt} from "react-icons/fa";
import {getWishlist} from "../../services/movieAPI";

const MyListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTab, setSelectedTab] = useState("Danh sách yêu thích");

    const location = useLocation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const handlePageChange = (newPage) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("page", newPage);
        navigate(`${location.pathname}?${searchParams.toString()}`);
    };

    const fetchWishlist = async () => {
        try {
            setLoading(true);
            const data = await getWishlist(navigate);
            if (data) {
                setFilms(data.data);
                setTotalPages(data.total_pages);
                setCurrentPage(data.page);
            }
        } catch (error) {
            console.error("Error fetching wishlist:", error);
            setError("Lỗi khi tải danh sách phim yêu thích.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedTab === "Danh sách yêu thích") {
            fetchWishlist();
        }
    }, [selectedTab, navigate]);

    const handleRemoveMovie = (movieId) => {
        setFilms((prevFilms) => prevFilms.filter((film) => film.movie_id !== movieId));
    };

    if (loading) {
        return <div className="container">Loading...</div>;
    }

    if (error) {
        return <div className="container">{error}</div>;
    }

    return (
        <div className="container">
            <aside className="sidebar">
                <h3>Quản lý tài khoản</h3>
                <ul>
                    <li className={selectedTab === "Danh sách yêu thích" ? "active" : ""} onClick={() => setSelectedTab("Danh sách yêu thích")}>
                        <FaHeart size={18} style={{marginRight: "8px"}} /> Yêu thích
                    </li>
                    <li className={selectedTab === "Tiếp tục xem" ? "active" : ""} onClick={() => setSelectedTab("Tiếp tục xem")}>
                        <FaClock size={18} style={{marginRight: "8px"}} /> Xem tiếp
                    </li>
                    <li className={selectedTab === "Tài khoản" ? "active" : ""} onClick={() => setSelectedTab("Tài khoản")}>
                        <FaUser size={18} style={{marginRight: "8px"}} /> Tài khoản
                    </li>
                </ul>
                <div className="profile">
                    <img src="profile.jpg" alt="Profile" />
                    <p>Pham Duy</p>
                    <span>@phamduy2004zx@gmail.com</span>
                </div>
                <div className="logout">
                    <FaSignOutAlt size={18} style={{marginRight: "8px"}} /> Thoát
                </div>
            </aside>

            <div id="mylist_page">
                <h4 className="mylist_page__title">{selectedTab}</h4>
                <div className="content">
                    {selectedTab === "Danh sách yêu thích" && (
                        <div className="film_list">
                            {films.length > 0 ? (
                                <FilmListColumn films={films} isMyList={true} onRemove={handleRemoveMovie} />
                            ) : (
                                <div className="no-data-container">
                                    <p>Bạn chưa có bộ phim yêu thích nào!</p>
                                    <button className="explore_button" onClick={() => navigate("/")}>
                                        Khám phá thêm
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {selectedTab === "Tiếp tục xem" && (
                        <div className="film_list">
                            {films.length > 0 ? (
                                films.map((film, index) => (
                                    <div key={index} className="film_item">
                                        <img src={film.image} alt={film.title} />
                                        <h3>{film.title}</h3>
                                        <p>⭐ {film.rating}</p>
                                        <p>👁️ {film.views} lượt xem</p>
                                    </div>
                                ))
                            ) : (
                                <div className="no-data-container">
                                    <p>Bạn chưa có bộ phim đã xem nào!</p>
                                    <button className="explore_button" onClick={() => navigate("/")}>
                                        Khám phá thêm
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {selectedTab === "Tài khoản" && <p>Thông tin tài khoản của bạn.</p>}
                </div>
                <div className="pagination_container">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
            </div>
        </div>
    );
};

export default MyListPage;
