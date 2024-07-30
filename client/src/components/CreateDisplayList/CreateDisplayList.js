import React, { useState, useEffect, useRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateDisplayList.scss';




const CreateDisplayList = memo((films) => {
    const filmItems = Object.values(films)[0];
    console.log(filmItems)
    const navigate = useNavigate(); // Sử dụng useNavigate trong component
    const videoRef = useRef(null);
    const divVideoRef = useRef(null);
    const [infoFilm, setInfoFilm] = useState({ 'index': '', 'id': '', 'title': '', 'video': '', 'content': '' });
    const [ishoverVideo, setHoverVideo] = useState(false)
    const back = (button) => {
        const div = button.parentElement.querySelector('div.display_list');
        let trans = parseInt(getComputedStyle(div).getPropertyValue('--trans').replace('px', ''), 10) || 0; // Đảm bảo trans là số
        const width = document.documentElement.clientWidth;

        if (trans !== 0) {
            if (-trans <= width) {
                div.style.setProperty('--trans', '0px');
            } else {
                trans += width;
                div.style.setProperty('--trans', `${trans}px`);
            }
        }
    };

    const next = (button) => {
        const div = button.parentElement.querySelector('div[class = display_list]');
        let trans = parseInt(getComputedStyle(div).getPropertyValue('--trans').replace('px', ''), 10) || 0;
        const width = document.documentElement.clientWidth;
        trans = (Math.floor((trans - width) / 138) + 2) * 138;
        if (trans > -1656) {
            div.style.setProperty('--trans', `${trans}px`);
        }
    };
    // const [filmItems, setFilmItems] = useState([]);
    // useEffect(() => {

    // }, []);




    function xem_ngay() {
        alert(infoFilm.id);
        navigate(`/film/${infoFilm.id}/1`)
    }

    function chi_tiet() {
        alert(infoFilm.id);
        navigate(`/detail/${infoFilm.id}/`)
    }
    function plus_list(button) {
        // Implement logic for adding to the list here
        // This function is currently a placeholder.
        console.log("Plus List button clicked");
    }



    var timeOut
    const molen = (element) => {
        var div = divVideoRef.current
        const divParent = element.parentNode;
        const index = parseInt(divParent.dataset.key, 10) || 0;
        div.style.left = `${index * 138 - 128}px`;
        timeOut = setTimeout(() => {

            const id = filmItems[index]['movie_id']
            const url = filmItems[index]['trailer_url']
            const title = filmItems[index]['title']
            const content = `${filmItems[index]['release_date']}|${filmItems[index]['runtime']}|${filmItems[index]['rating']}|${filmItems[index]['views']}`
            setInfoFilm({ 'index': index, 'id': id, 'title': title, 'video': url, 'content': content })
            div.style.height = '230px';
            // div.style.width = " 384px";
            div.style.transition = 'all 0.3s ease'
            const width = document.documentElement.clientWidth;
            const divParent = div.parentNode
            const trans = parseInt(getComputedStyle(divParent).getPropertyValue('--trans').replace('px', ''), 10) || 0;
            if (index * 138 - 123 < -trans) {
                div.style.transform = `translateX(${(-trans - (index * 138 - 123))}px)`;
            } else if ((index + 1) * 138 + 123 > -trans + width) {
                div.style.transform = `translateX(-${((index + 1) * 138 + 153 - (-trans + width))}px)`;
            }

            const handleMouseEnter = () => {
                clearTimeout(timeoutId);

            };
            let timeoutId = setTimeout(() => {
                setInfoFilm({ 'index': '', 'id': '', 'title': '', 'video': '', 'content': '' });
                div.style.height = '0px';
                // div.style.width = " 0px";
                div.style.transition = 'none';
                div.style.transform = `translateX(0px)`
            }, 1000);

            // Giả sử div là phần tử bạn muốn theo dõi
            if (div) {
                div.addEventListener('mouseenter', handleMouseEnter);

                return () => {
                    div.removeEventListener('mouseenter', handleMouseEnter);
                    clearTimeout(timeoutId);
                };
            }
        }, 1000);


    };

    const tatdi = (element) => {
        clearTimeout(timeOut)
        var div = divVideoRef.current

        if (div) {
            div.addEventListener("mouseleave", (event) => {
                setInfoFilm({ 'index': '', 'id': '', 'title': '', 'video': '', 'content': '' })
                // setHoverVideo(false)
                div.style.height = '0px';
                // div.style.width = " 0px";
                div.style.transition = 'none';
                div.style.transform = `translateX(0px)`
            });
        }

    };

    const handleClickImg = (element) => {
        const divParent = element.parentNode;
        const index = parseInt(divParent.dataset.key, 10) || 0;
        navigate(`/detail/${filmItems[index]['movie_id']}`)
    }
    // useEffect(() => {
    //     var div = divVideoRef.current
    //     if (div) {
    //         if (infoFilm['index'] === '') {

    //         }
    //         else {
    //             // div.style.transform = `translateX(100px)`;

    //         }
    //     }

    // }, [infoFilm['index']])

    return (
        <div className="display">
            <button className="back" onClick={(event) => back(event.currentTarget)}>
                <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button className="next" onClick={(event) => next(event.currentTarget)}>
                <i className="fa-solid fa-arrow-right"></i>
            </button>
            <div className="display_list">
                <div className="video" ref={divVideoRef} >
                    <video src={infoFilm.video} muted loop autoPlay ref={videoRef} />

                    <div className="control">
                        <h2>{infoFilm.title}</h2>
                        <div>
                            <button onClick={(event) => xem_ngay(event.currentTarget)}>
                                <div>
                                    <i className="fa-solid fa-play"></i>
                                    Xem ngay
                                </div>
                            </button>
                            <button onClick={(event) => plus_list(event.currentTarget)}>
                                <div>
                                    <i className="fa-solid fa-plus"></i>
                                    Danh sách
                                </div>
                            </button>
                            <button onClick={(event) => chi_tiet(event.currentTarget)}>
                                <div>
                                    <i className="fa-regular fa-lightbulb"></i>
                                    Chi tiết
                                </div>
                            </button>
                        </div>
                        <p>{infoFilm.content}</p>
                    </div>
                </div>
                {filmItems.map((item, index) => (
                    <div key={index} data-key={index} className="film-container">
                        <a className="img" onMouseLeave={(event) => tatdi(event.currentTarget)}
                            onMouseEnter={(event) => molen(event.currentTarget)} onClick={(event) => handleClickImg(event.currentTarget)} >
                            <img src={item.poster_url} alt=""
                            />
                        </a>

                    </div>
                ))}

            </div>
        </div>
    );
})


export default CreateDisplayList;