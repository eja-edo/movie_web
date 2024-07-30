import React, { useState, useEffect } from 'react';
import './FilmList.css';

const FilmList = (films) => {
    films = Object.values(films)[0];
    console.log(films)
    return (

        <div id="hh2">
            {Array.isArray(films) ? films.map((item, index) => (
                <a href="mtphim.html" className="max_scanner_img" key={index}>
                    <div>
                        <img src={item.poster_url} alt={item.title} />
                        <video src={item.trailer_url} loop autoPlay muted />
                        <div>
                            <h4>{item.title}</h4>
                            <div>
                                <p style={{ display: 'none' }}>{item.id}</p>
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
            )) : <></>}
        </div>
    );
};

export default FilmList;