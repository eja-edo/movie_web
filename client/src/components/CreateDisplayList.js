import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateDisplayList.scss';


// --- Hàm tiện ích (Utility Functions) --- 

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


const CreateDisplayList = ({ url }) => {

    const [filmItems, setFilmItems] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    redirect: 'follow',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                console.log(data)
                setFilmItems(data);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="display">
            <button className="back" onClick={(event) => back(event.currentTarget)}>
                <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button className="next" onClick={(event) => next(event.currentTarget)}>
                <i className="fa-solid fa-arrow-right"></i>
            </button>
            <div className="display_list">
                {filmItems.map((item, index) => (
                    <div key={index} data-key={index} className="film-container">
                        <FilmItem
                            id={item.movie_id} // Sửa i thành id
                            img={item.poster_url} // Sửa img1 thành img 
                            video={item.trailer_url} // Sửa video1 thành video
                            content={`${item.release_date} | ${item.runtime} | ${item.rating} | ${item.views}`} // Sửa content1 thành content
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

const FilmItem = ({ id, img, video, content }) => {
    const [isVideoReady, setIsVideoReady] = useState(false);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const navigate = useNavigate(); // Sử dụng useNavigate trong component

    const molen = (element) => {
        const div = element.querySelector('div');
        const video = div.querySelector('video');
        if (isVideoReady === true && isPlaying === false) {
            video.play();
            console.log('đã mở')
            setIsPlaying(true)
        }
        if (videoRef.current && videoRef.current.readyState === 4) {
            setIsVideoReady(true);
            if (isPlaying === false) {
                video.play()
                setIsPlaying(true)
            }
        } else {
            // Nếu chưa tải xong, bắt đầu kiểm tra liên tục
            const intervalId = setInterval(() => {
                if (videoRef.current && videoRef.current.readyState === 4) {
                    setIsVideoReady(true);
                    if (isPlaying === false) {
                        video.play()
                        setIsPlaying(true)
                    }
                    clearInterval(intervalId);
                }
            }, 500);
        }
        const divParent = element.parentNode;
        const width = document.documentElement.clientWidth;
        const index = parseInt(divParent.dataset.key, 10) || 0;
        const trans = parseInt(getComputedStyle(div).getPropertyValue('--trans').replace('px', ''), 10) || 0;
        if (index * 138 - 123 < -trans) {
            div.style.transform = `translateX(${(-trans - (index * 138 - 123))}px)`;
        } else if ((index + 1) * 138 + 123 > -trans + width) {
            div.style.transform = `translateX(-${((index + 1) * 138 + 153 - (-trans + width))}px)`;
        }
    };

    const tatdi = (element) => {
        const div = element.querySelector('div');
        const video = div.querySelector('video');
        if (isVideoReady === true && isPlaying === true) {
            video.pause();
            console.log('đã tắt')
            setIsPlaying(false)
        }

    };


    function xem_ngay(button) {
        const div = button.parentElement;
        const currentID = div.previousSibling.textContent;
        alert(currentID);
        navigate(`/film/${id}/1`)
    }

    function chi_tiet(button) {
        const div = button.parentElement;
        const id = div.previousSibling.textContent;
        alert(id);
        navigate(`/detail/${id}`)
    }
    function plus_list(button) {
        // Implement logic for adding to the list here
        // This function is currently a placeholder.
        console.log("Plus List button clicked");
    }
    return (
        <a
            className="img"
            onMouseLeave={(event) => tatdi(event.currentTarget)}
            onMouseEnter={(event) => molen(event.currentTarget)}
        >
            <img src={img} alt="" />

            <div className="video">
                <video src={video} muted loop ref={videoRef} />

                <div className="control">
                    <p style={{ display: 'none' }}>{id}</p>
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
                    <p>{content}</p>
                </div>
            </div>
        </a>
    );
};

export default CreateDisplayList;