import React, { useState } from "react";
import "./FilmListColumn.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const FilmListColumn = ({ films }) => {
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
            {Array.isArray(films) ? (
                films.map((item, index) => (
                    <a href="mtphim.html" className="film-card" key={index} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                        <div className="film-thumbnail">
                            <img src={process.env.REACT_APP_API_URL + item.poster_url} alt={item.title} />
                            <video loop autoPlay muted style={{ display: hoveredIndex === index ? "block" : "none" }} src={hoveredIndex === index ? process.env.REACT_APP_API_URL + item.trailer_url : null} />
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
                            <h4 className="film-title">{item.title}</h4>
                            <div className="film-meta">
                                <p className="film-id" style={{ display: "none" }}>
                                    {item.id}
                                </p>
                                <div className="film-rating-views">
                                    <span className="film-rating">⭐ {item.rating}</span>
                                    <span className="film-views"> {item.views} lượt xem</span>
                                </div>
                                <div className="film-release-runtime">
                                    <span className="film-release"> {item.release_date}</span>
                                    <span className="film-runtime"> {item.runtime} phút</span>
                                </div>
                            </div>
                        </div>
                    </a>
                ))
            ) : (
                <p>Không có phim nào để hiển thị.</p>
            )}
        </div>
    );
};

export default FilmListColumn;
