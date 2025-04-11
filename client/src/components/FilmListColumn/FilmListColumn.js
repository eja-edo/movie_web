import React, {useState, useEffect} from "react";
import "./FilmListColumn.scss";
import {Link, useNavigate} from "react-router-dom"; // Sử dụng Link thay vì thẻ a
import {FaHeart, FaRegHeart, FaTimes} from "react-icons/fa";
import {addToWishlist, removeFromWishlist} from "../../services/movieAPI";

const FilmListColumn = ({films, isMyList = false}) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [liked, setLiked] = useState(Array(films.length).fill(false));
    const [movieList, setMovieList] = useState(films);
    const navigate = useNavigate();

    useEffect(() => {
        setMovieList(films);
    }, [films]);

    // console.log("Dữ liệu API (trong FilmListColumn):", films);
    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const toggleLike = (index) => {
        const newLiked = [...liked];
        newLiked[index] = !newLiked[index];
        setLiked(newLiked);
    };

    const handleWishlistClick = async (movieId, e, isLiked) => {
        e.stopPropagation();
        try {
            if (isLiked) {
                // gọi API để thêm vào wishlist
                await addToWishlist(movieId, navigate);
            } else {
                // gọi API để bỏ tym
                await removeFromWishlist(movieId, navigate);
            }
        } catch (error) {
            console.error("Error occurred:", error);
            if (error.message === "User not authenticated") {
                navigate("/login");
            } else {
                alert(error.message);
            }
        }
    };

    return (
        <div className="film-list-container">
            {movieList.length > 0 ? (
                movieList.map((item, index) => {
                    const filmId = item.movie_id || `${index}`;
                    const filmTitle = item.title || "Không có tiêu đề";
                    const filmPoster = item.poster_url ? `${process.env.REACT_APP_API_URL}${item.poster_url}` : "/default-poster.jpg";
                    const filmTrailer = item.trailer_url ? `${process.env.REACT_APP_API_URL}${item.trailer_url}` : null;

                    return (
                        <Link to={`/detail/${filmId}`} className="film-card" key={filmId} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                            <div className="film-thumbnail">
                                <img src={filmPoster} alt={filmTitle} />
                                {filmTrailer && hoveredIndex === index && <video loop autoPlay muted src={filmTrailer} style={{display: "block"}} />}

                                {!isMyList ? (
                                    <div
                                        className={`film-like-icon ${liked[index] ? "liked" : ""}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const newLikedStatus = !liked[index];
                                            handleWishlistClick(filmId, e, newLikedStatus);
                                            toggleLike(index);
                                        }}
                                    >
                                        {liked[index] ? <FaHeart /> : <FaRegHeart />}
                                    </div>
                                ) : (
                                    <div
                                        className="film-close-icon"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // e.stopPropagation();
                                            removeFromWishlist(filmId, navigate);
                                            setMovieList((prev) => prev.filter((film) => film.movie_id !== filmId));
                                        }}
                                    >
                                        <FaTimes />
                                    </div>
                                )}
                            </div>

                            <div className="film-info">
                                <p className="film-id" style={{display: "none"}}>
                                    {filmId}
                                </p>
                                <h4 className="film-title">{filmTitle}</h4>
                                <div className="film-meta">
                                    <div className="film-rating-views">
                                        <span className="film-rating">⭐ {item.rating || "Chưa có đánh giá"}</span>
                                        <span className="film-views"> {item.views || 0} lượt xem</span>
                                    </div>
                                    <div className="film-release-runtime">
                                        <span className="film-release"> {item.release_date || "Không có ngày"}</span>
                                        <span className="film-runtime"> {item.runtime || "?"} phút</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })
            ) : (
                <p>Không có phim nào để hiển thị.</p>
            )}
        </div>
    );
};

export default FilmListColumn;
