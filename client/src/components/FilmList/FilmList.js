import React, { useState, useEffect } from "react";
import "./FilmList.css";

const FilmList = (films) => {
    films = Object.values(films)[0];

    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div id="hh2">
            {Array.isArray(films) ? (
                films.map((item, index) => (
                    <a href="mtphim.html" className="max_scanner_img" key={index} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                        <div>
                            <img src={process.env.REACT_APP_API_URL + item.poster_url} alt={item.title} />
                            <video
                                loop
                                autoPlay
                                muted
                                style={{ display: hoveredIndex === index ? "block" : "none" }}
                                src={hoveredIndex === index ? process.env.REACT_APP_API_URL + item.trailer_url : null} // Chỉ đặt src khi hover
                            />
                            <div>
                                <h4>{item.title}</h4>
                                <div>
                                    <p style={{ display: "none" }}>{item.id}</p>
                                    <p>
                                        {item.rating} {item.views}
                                    </p>
                                    <p>
                                        {item.release_date} | {item.runtime}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </a>
                ))
            ) : (
                <></>
            )}
        </div>
    );
};

export default FilmList;
