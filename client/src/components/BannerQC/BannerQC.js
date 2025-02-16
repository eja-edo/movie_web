import React, { useState, useEffect, useRef } from "react";
import "./BannerQC.scss";
import { fetchBannerQC } from "../../services/movieAPI";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BannerQC = () => {
  const [bannerQC, setBannerQC] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idVideo, setIdVideo] = useState(0); // Dùng useState để lưu trạng thái vị trí video
  const qcVideoRef = useRef(null); // Tham chiếu đến phần tử video

  // Chuyển video QC sang trái
  const nextVideoQc = () => {
    if (idVideo < 4) {
      setIdVideo((prev) => prev + 1);
    }
  };

  // Chuyển video QC sang phải
  const backVideoQc = () => {
    if (idVideo > 0) {
      setIdVideo((prev) => prev - 1);
    }
  };

  // Cập nhật vị trí video khi idVideo thay đổi
  useEffect(() => {
    if (qcVideoRef.current) {
      qcVideoRef.current.style.transform = `translateX(${idVideo * -100}vw)`;
    }
  }, [idVideo]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchBannerQC();
        setBannerQC(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="bannerQC">
      <div id="qc">
        <div id="qc_video" ref={qcVideoRef}>
          {bannerQC.slice(0, 5).map((item, index) => (
            <div key={index} className="if_video">
              <video src={item.trailer_url} autoPlay loop muted />
            </div>
          ))}
        </div>
        <div className="bottom_backgroud" />
        <div className="info">
          <h1
            className="banner_name"
            style={{
              textAlign: "center",
              marginBottom: "10px",
              fontSize: "2.6rem",
            }}
          >
            {bannerQC[idVideo].title}
          </h1>
          <p
            className="banner_info"
            style={{
              width: "80%",
              textAlign: "center",
              margin: "0 10% 30px",
              fontSize: "1.3rem",
            }}
          >
            {bannerQC[idVideo].description}
          </p>

          {/* Nút chuyển video */}

          <div
            className="control_movie"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <a href="film.html">
              <div
                className="btn-watch"
                style={{ background: "red", border: "2px solid red" }}
              >
                <i className="fa-solid fa-play"></i> Xem Ngay
              </div>
            </a>
            <a href="mtphim.html">
              <div>
                <i className="fa-regular fa-lightbulb"></i> Chi tiết
              </div>
            </a>
          </div>
          <div className="banner-container">
            <div
              id="back_video_qc"
              onClick={backVideoQc}
              className="control-button left"
            >
              <FaChevronLeft size={50} />
            </div>

            <div
              id="next_video_qc"
              onClick={nextVideoQc}
              className="control-button right"
            >
              <FaChevronRight size={50} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerQC;
