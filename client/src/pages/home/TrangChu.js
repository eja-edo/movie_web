import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './trang_chu.scss';
import BannerQC from '../../components/BannerQC/BannerQC';
import CreateDisplayList from '../../components/CreateDisplayList/CreateDisplayList';
import LazyLoad from 'react-lazyload';
import { fetchDisplayList, fetchDisplayListByGenre10 } from '../../services/movieAPI';
import ShowDisplay from '../../components/showdisplay/showdisplay';
function TrangChu() {
    const [crHeaderVisible, setCrHeaderVisible] = useState(false);
    const [filmThinhHanh, setFilmth] = useState(null)
    const [filmHot, setFilmhot] = useState(null)
    const [filmHoatHinh, setFilmHH] = useState(null)
    const [myList, setMylist] = useState(null)
    const [filmTinhCam, setFilmTC] = useState(null)
    const [filmKinhDi, setFilmKD] = useState(null)
    const [filmle, setFilmLe] = useState(null)
    const [filmHanhDong, setFilmHD] = useState(null)
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [thinhHanhData, filmHotData, filmHoatHinhData, myListData, filmTinhCamData, filmKinhDiData, filmLeData, filmHanhDongData] = await Promise.all([
                    fetchDisplayList('http://127.0.0.1:8000/service/get_thinhhanh/'),
                    fetchDisplayList('http://127.0.0.1:8000/service/get_phimhot_10/'),
                    fetchDisplayListByGenre10('phim hoạt hình'),
                    fetchDisplayList('http://127.0.0.1:8000/service/get_thinhhanh/'),
                    fetchDisplayListByGenre10('phim tình cảm'),
                    fetchDisplayListByGenre10('phim kinh dị'),
                    fetchDisplayList('http://127.0.0.1:8000/service/get_thinhhanh/'),
                    fetchDisplayListByGenre10('phim hành động'),
                ]);
                setFilmth(thinhHanhData);
                setFilmhot(filmHotData);
                setFilmHH(filmHoatHinhData);
                setMylist(myListData);
                setFilmTC(filmTinhCamData);
                setFilmKD(filmKinhDiData);
                setFilmLe(filmLeData);
                setFilmHD(filmHanhDongData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     const trangChu = document.getElementById('TrangChu');
    //     const header = document.querySelector('header');

    //     const handleScroll = () => {
    //         header.style.backgroundColor = trangChu.scrollY === 0
    //             ? 'rgba(0, 0, 0, 0.2)'
    //             : 'rgba(0, 0, 0, 0.8)';
    //     };

    //     trangChu.addEventListener('scroll', handleScroll);
    //     return () => trangChu.removeEventListener('scroll', handleScroll);


    const handleScroll = (trangchu) => {
        console.log(trangchu.crollTop)
    }


    const handleNavigation = (route) => {
        navigate(route);
    };
    // }, []);

    return (
        <div id="TrangChu" onScroll={(event) => { handleScroll(event.currentTarget) }}>
            <header>
                <ul>
                    <li onClick={() => setCrHeaderVisible(!crHeaderVisible)}>
                        <a href="#">Bộ lọc</a>
                    </li>
                    |
                    <li onClick={() => setCrHeaderVisible(!crHeaderVisible)}>
                        <a href="#">Năm phát hành</a>
                    </li>
                    |
                    <li onClick={() => setCrHeaderVisible(!crHeaderVisible)}>
                        <a href="#">Tin tức</a>
                    </li>
                    |
                    <li onClick={() => setCrHeaderVisible(!crHeaderVisible)}>
                        <a href="#">Giới thiệu</a>
                    </li>
                    |
                    <li>
                        <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>
                            Halls Choice
                        </a>
                    </li>
                </ul>

                {crHeaderVisible && (
                    <div className="cr">
                        {/* ... Nội dung cr ... */}
                    </div>
                )}
                {crHeaderVisible && (
                    <div className="cr1">
                        {/* ... Nội dung cr1 ... */}
                    </div>
                )}
            </header>
            <div id="trangchu" >
                <BannerQC />

                <a href="#" className="xemthem" onClick={(e) => { e.preventDefault(); handleNavigation('/theloai_timphim.html'); }}>
                    <h2>THỊNH HÀNH</h2>
                    <div className="xemtatca" onClick={() => handleNavigation('/theloai_timphim.html')}>Xem tất cả<i className="fa-solid fa-chevron-right"></i></div>
                </a>
                <LazyLoad height={200} offset={100}>{filmThinhHanh ? <CreateDisplayList films={filmThinhHanh} /> : <></>}</LazyLoad>
                <a href="#" className="xemthem" onClick={(e) => { e.preventDefault(); handleNavigation('/theloai_timphim.html'); }}>
                    <h2>MỚI NHẤT</h2>
                    <div className="xemtatca" onClick={() => handleNavigation('/theloai_timphim.html')}>Xem tất cả<i className="fa-solid fa-chevron-right"></i></div>
                </a>
                <LazyLoad height={200} offset={100}>{filmHot ? <CreateDisplayList films={filmHot} /> : <></>}</LazyLoad>
                <ShowDisplay />
                <a href="#" className="xemthem" onClick={(e) => { e.preventDefault(); handleNavigation('/tesst_film.html'); }}>
                    <h2>PHIM HOẠT HINH</h2>
                    <div className="xemtatca" onClick={() => handleNavigation('/tesst_film.html')}>Xem tất cả<i className="fa-solid fa-chevron-right"></i></div>
                </a>
                <LazyLoad height={200} offset={100}>{filmHoatHinh ? <CreateDisplayList films={filmHoatHinh} /> : <></>}</LazyLoad>
                <a href="#" className="xemthem" onClick={(e) => { e.preventDefault(); handleNavigation('/ds_cuatoi.html'); }}>
                    <h2>DANH SÁCH CỦA TÔI</h2>
                    <div className="xemtatca" onClick={() => handleNavigation('/ds_cuatoi.html')}>Xem tất cả<i className="fa-solid fa-chevron-right"></i></div>
                </a>
                <LazyLoad height={200} offset={100}>{myList ? <CreateDisplayList films={myList} /> : <></>}</LazyLoad>
                <a href="#" className="xemthem" onClick={(e) => { e.preventDefault(); handleNavigation('/phimdienanh.html'); }}>
                    <h2>PHIM TÌNH CẢM </h2>
                    <div className="xemtatca" onClick={() => handleNavigation('/phimdienanh.html')}>Xem tất cả<i className="fa-solid fa-chevron-right"></i></div>
                </a>
                <LazyLoad height={200} offset={100}>{filmTinhCam ? <CreateDisplayList films={filmTinhCam} /> : <></>}</LazyLoad>
                <div
                    className="phimqc"
                    onMouseOver={(event) => { event.currentTarget.querySelector('video').play() }}
                    onMouseOut={(event) => { event.currentTarget.querySelector('video').pause() }}
                >
                    <video src="http://127.0.0.1:8000/static/assets/short-video/Teaser_NgoiDenKyQuai3.mp4" muted loop />
                    <div
                        style={{
                            width: 'auto',
                            marginLeft: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            style={{ width: '100%' }}
                            src="http://127.0.0.1:8000/static/assets/img/ovn93mk3_title-ngoidenkyquai3-nenden_815_255.png"
                            alt=""
                        />
                        <p>2022 | T16 | Thái Lan | 1g 51ph </p>
                        <p>
                            Aod dính lời nguyền chết chóc vì trót giữ chiếc vòng chân bằng vàng
                            cổ. Để cứu Aod, hội bạn của anh đã nhanh chóng giải lời nguyền
                            trước khi quỷ dữ lấy mạng anh
                        </p>
                        <div className="control_movie">
                            <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/film.html'); }}>
                                <div style={{ color: 'black', backgroundColor: '#fff' }}>
                                    <i className="fa-solid fa-play"></i>Xem Ngay
                                </div>
                            </a>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/mtphim.html'); }}>
                                <div>
                                    <i className="fa-regular fa-lightbulb"></i>Chi tiết
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <a href="#" className="xemthem" onClick={(e) => { e.preventDefault(); handleNavigation('/theloai_timphim.html'); }}>
                    <h2>PHIM KINH DỊ</h2>
                    <div className="xemtatca" onClick={() => handleNavigation('/theloai_timphim.html')}>Xem tất cả<i className="fa-solid fa-chevron-right"></i></div>
                </a>
                <LazyLoad height={200} offset={100}>{filmKinhDi ? <CreateDisplayList films={filmKinhDi} /> : <></>}</LazyLoad>
                <a href="#" className="xemthem" onClick={(e) => { e.preventDefault(); handleNavigation('/theloai_timphim.html'); }}>
                    <h2>PHIM LẺ</h2>
                    <div className="xemtatca" onClick={() => handleNavigation('/theloai_timphim.html')}>Xem tất cả<i className="fa-solid fa-chevron-right"></i></div>
                </a>
                <LazyLoad height={200} offset={100}>{filmle ? <CreateDisplayList films={filmle} /> : <></>}</LazyLoad>
                <a href="#" className="xemthem" onClick={(e) => { e.preventDefault(); handleNavigation('/theloai_timphim.html'); }}>
                    <h2>PHIM HÀNH ĐỘNG</h2>
                    <div className="xemtatca" onClick={() => handleNavigation('/theloai_timphim.html')}>Xem tất cả<i className="fa-solid fa-chevron-right"></i></div>
                </a>
                <LazyLoad height={200} offset={100}>{filmHanhDong ? <CreateDisplayList films={filmHanhDong} /> : <></>}</LazyLoad>
            </div>
        </div>
    );
}

export default TrangChu;