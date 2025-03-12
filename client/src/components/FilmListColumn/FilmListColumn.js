import React, {useState} from "react";
import "./FilmListColumn.scss";
import {Link} from "react-router-dom"; // Sử dụng Link thay vì thẻ a
import {FaHeart, FaRegHeart} from "react-icons/fa";

const FilmListColumn = ({films}) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [liked, setLiked] = useState(Array(films.length).fill(false));

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

    return (
        <div className="film-list-container">
            {films.length > 0 ? (
                films.map((item, index) => {
                    const filmId = item.id || item.genre_id || item.nation_id || `${index}`;
                    const filmTitle = item.title || "Không có tiêu đề";
                    const filmPoster = item.poster_url ? `${process.env.REACT_APP_API_URL}${item.poster_url}` : "/default-poster.jpg";
                    const filmTrailer = item.trailer_url ? `${process.env.REACT_APP_API_URL}${item.trailer_url}` : null;

                    return (
                        <Link to={`/detail/${filmId}`} className="film-card" key={filmId} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                            <div className="film-thumbnail">
                                <img src={filmPoster} alt={filmTitle} />
                                {filmTrailer && hoveredIndex === index && <video loop autoPlay muted src={filmTrailer} style={{display: "block"}} />}
                                <div
                                    className={`film-like-icon ${liked[index] ? "liked" : ""}`}
                                    onClick={(e) => {
                                        e.preventDefault(); // Ngăn chuyển trang khi click
                                        toggleLike(index);
                                    }}
                                >
                                    {liked[index] ? <FaHeart /> : <FaRegHeart />}
                                </div>
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
