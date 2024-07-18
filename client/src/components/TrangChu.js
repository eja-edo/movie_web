import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/trang_chu.scss';
import BannerQC from './BannerQC';
import CreateDisplayList from './CreateDisplayList';
import LazyLoad from 'react-lazyload';

function TrangChu() {
    const [crHeaderVisible, setCrHeaderVisible] = useState(false);
    const [showIndex, setShowIndex] = useState(0);
    const showDisplayListRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const trangChu = document.getElementById('TrangChu');
        const header = document.querySelector('header');

        const handleScroll = () => {
            header.style.backgroundColor = trangChu.scrollY === 0
                ? 'rgba(0, 0, 0, 0.2)'
                : 'rgba(0, 0, 0, 0.8)';
        };

        trangChu.addEventListener('scroll', handleScroll);
        return () => trangChu.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setShowIndex((prevIndex) => (prevIndex >= 2 ? 0 : prevIndex + 1));
        }, 8000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (showDisplayListRef.current) {
            showDisplayListRef.current.style.transform = `translateX(-${showIndex * 98}%)`;
        }
    }, [showIndex]);

    const handleNavigation = (route) => {
        navigate(route);
    };

    return (
        <div id="TrangChu">
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
            <div id="trangchu">
                <BannerQC />

                <a href="#" className="xemthem" onClick={(e) => { e.preventDefault(); handleNavigation('/theloai_timphim.html'); }}>
                    <h2>THỊNH HÀNH</h2>
                    <div className="xemtatca" onClick={() => handleNavigation('/theloai_timphim.html')}>Xem tất cả<i className="fa-solid fa-chevron-right"></i></div>
                </a>
                <LazyLoad height={200} offset={100}><CreateDisplayList url='http://127.0.0.1:8000/service/get_thinhhanh/' /></LazyLoad>
                <a href="#" className="xemthem" onClick={(e) => { e.preventDefault(); handleNavigation('/theloai_timphim.html'); }}>
                    <h2>MỚI NHẤT</h2>
                    <div className="xemtatca" onClick={() => handleNavigation('/theloai_timphim.html')}>Xem tất cả<i className="fa-solid fa-chevron-right"></i></div>
                </a>
                <LazyLoad height={200} offset={100}><CreateDisplayList url='http://127.0.0.1:8000/service/get_thinhhanh/' /></LazyLoad>
                <div className="display_show" id="show1">
                    <button className="back" onClick={() => setShowIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button className="next" onClick={() => setShowIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : prevIndex))}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                    <div className="show_display_list" ref={showDisplayListRef}>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/'); }}>
                            <img src="http://127.0.0.1:8000/static/assets/img/9ex8qx1n_7nam_hb_web_2388_458.jpg" alt="" />
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/'); }}>
                            <img
                                src="http://127.0.0.1:8000/static/assets/img/au1qvk6a_homebanner_khanhdunienweb_2388x3712_2388_458.jpg"
                                alt=""
                            />
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/'); }}>
                            <img
                                src="http://127.0.0.1:8000/static/assets/img/kmmab8k0_web18ce19a0c0167a03a57e2b4bd93f5dd15_2388_458.jpg"
                                alt=""
                            />
                        </a>
                    </div>
                </div>
                <a href="#" className="xemthem" onClick={(e) => { e.preventDefault(); handleNavigation('/tesst_film.html'); }}>
                    <h2>PHIM HOẠT HINH</h2>
                    <div className="xemtatca" onClick={() => handleNavigation('/tesst_film.html')}>Xem tất cả<i className="fa-solid fa-chevron-right"></i></div>
                </a>
                <LazyLoad height={200} offset={100}><CreateDisplayList url='http://127.0.0.1:8000/service/get_thinhhanh/' /></LazyLoad>
                <a href="#" className="xemthem" onClick={(e) => { e.preventDefault(); handleNavigation('/ds_cuatoi.html'); }}>
                    <h2>DANH SÁCH CỦA TÔI</h2>
                    <div className="xemtatca" onClick={() => handleNavigation('/ds_cuatoi.html')}>Xem tất cả<i className="fa-solid fa-chevron-right"></i></div>
                </a>
                <LazyLoad height={200} offset={100}><CreateDisplayList url='http://127.0.0.1:8000/service/get_thinhhanh/' /></LazyLoad>
                <a href="#" className="xemthem" onClick={(e) => { e.preventDefault(); handleNavigation('/phimdienanh.html'); }}>
                    <h2>PHIM ĐIỆN ẢNH </h2>
                    <div className="xemtatca" onClick={() => handleNavigation('/phimdienanh.html')}>Xem tất cả<i className="fa-solid fa-chevron-right"></i></div>
                </a>
                <LazyLoad height={200} offset={100}><CreateDisplayList url='http://127.0.0.1:8000/service/get_thinhhanh/' /></LazyLoad>
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
                <LazyLoad height={200} offset={100}><CreateDisplayList url='http://127.0.0.1:8000/service/get_thinhhanh/' /></LazyLoad>
                <a href="#" className="xemthem" onClick={(e) => { e.preventDefault(); handleNavigation('/theloai_timphim.html'); }}>
                    <h2>PHIM LẺ</h2>
                    <div className="xemtatca" onClick={() => handleNavigation('/theloai_timphim.html')}>Xem tất cả<i className="fa-solid fa-chevron-right"></i></div>
                </a>
                <LazyLoad height={200} offset={100}><CreateDisplayList url='http://127.0.0.1:8000/service/get_thinhhanh/' /></LazyLoad>
                <a href="#" className="xemthem" onClick={(e) => { e.preventDefault(); handleNavigation('/theloai_timphim.html'); }}>
                    <h2>PHIM HÀNH ĐỘNG</h2>
                    <div className="xemtatca" onClick={() => handleNavigation('/theloai_timphim.html')}>Xem tất cả<i className="fa-solid fa-chevron-right"></i></div>
                </a>
                <LazyLoad height={200} offset={100}><CreateDisplayList url='http://127.0.0.1:8000/service/get_thinhhanh/' /></LazyLoad>
            </div>
            <footer>
                <div className="container">
                    <div className="logo">
                        <img src="http://127.0.0.1:8000/static/assets//img/logo.png" alt="logo" style={{ width: '60px' }} />
                    </div>
                    <div className="footer">
                        <div className="contact-info">
                            Địa chỉ: Nhóm 2, D14CNPM4, Đại Học điện lực, Hoàng Quốc
                            Việt,Cổ Nhuế, Bắc Từ Liêm, Hà Nội
                            <br />
                            Email: abc@gmail.com
                            <br />
                            Hotline: 0123.456.789 (miễn phí)
                        </div>
                        <div className="nav-links">
                            <div className="nav-link">
                                <a href="../../GioiThieu/index.html">GIỚI THIỆU</a>
                            </div>
                            <div className="nav-link">QUY ĐỊNH</div>
                            <div className="nav-link">THÔNG TIN</div>
                        </div>
                    </div>
                    <div className="qr-code">
                        <img src="http://127.0.0.1:8000/static/assets//img/halls.png" alt="QR Code" style={{ width: '100px' }} />
                        <div>Quét mã QR để tải ứng dụng</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default TrangChu;