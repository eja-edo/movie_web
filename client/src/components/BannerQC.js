import React, { useState, useEffect } from 'react';
import '../styles/BannerQC.css';

// Component BannerQC riêng biệt
const BannerQC = () => {
    const [bannerQC, setBannerQC] = useState([]);
    var id_video = 0;
    // tạo phương thức duy chuyển sang trái cho phần video quảng cáo phim hot
    function nextVideoQc() {
        if (id_video < 4) {
            id_video++;
            document.getElementById('qc_video').style.transform = 'translateX(' + (id_video * -100) + 'vw)';
        }
    }
    // tạo phương thức duy chuyển sang phải cho phần video quảng cáo phim hot
    function backVideoQc() {
        if (id_video > 0) {
            id_video--;
            document.getElementById('qc_video').style.transform = 'translateX(' + (id_video * -100) + 'vw)';
        }
    }

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer mybearertoken"); // Gửi token trong header

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch('http://127.0.0.1:8000/service/get_banner_qc/', requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setBannerQC(data);
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }, []); // Chỉ chạy fetch một lần khi component mount

    return (
        <>
            <div id="qc">
                <div id="qc_video">
                    {bannerQC.slice(0, 5).map((item, index) => (
                        <div key={index} className="if_video" onMouseOver={(event) => { event.currentTarget.querySelector('video').play() }}
                            onMouseOut={(event) => { event.currentTarget.querySelector('video').pause() }}>
                            <video src={item.trailer_url} loop muted />
                            <div className="bottom_backgroud" />
                            <div className="info">
                                <h1>{item.title}</h1>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <div id="control">
                <div className="control_movie" style={{ marginLeft: '20px' }}>
                    <a href="film.html">
                        <div style={{ color: 'black', backgroundColor: '#fff' }}>
                            <i className="fa-solid fa-play"></i>Xem Ngay
                        </div>
                    </a>
                    <a href="mtphim.html">
                        <div>
                            <i className="fa-regular fa-lightbulb"></i>Chi tiết
                        </div>
                    </a>
                </div>
                <div id="control_div">
                    <a id="back_video_qc" onClick={() => backVideoQc()}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </a>
                    <a id="next_video_qc" onClick={() => nextVideoQc()}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </a>
                </div>
            </div>
        </>

    );
};
export default BannerQC;