import React, { useState, useEffect, useRef } from "react";
import "./BannerQC.scss";
import movieAPI from "../../services/movieAPI";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BannerQC = () => {
  const navigate = useNavigate();
  const [bannerQC, setBannerQC] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idVideo, setIdVideo] = useState(0); // Dùng useState để lưu trạng thái vị trí video
  const qcVideoRef = useRef(null); // Tham chiếu đến phần tử video

  // Chuyển video QC sang phải
  const nextVideoQc = () => {
    if (idVideo < bannerQC.length - 1) {
      setIdVideo((prev) => prev + 1);
    } else {
      setIdVideo(0); // Reset về video đầu tiên
    }
  };

  // Chuyển video QC sang trái
  const backVideoQc = () => {
    if (idVideo > 0) {
      setIdVideo((prev) => prev - 1);
    } else {
      setIdVideo(bannerQC.length - 1); // Chuyển đến video cuối cùng
    }
  };
  const xem_ngay = async (movie_id) => {
    if (!movie_id) {
      console.error("❌ movie_id bị undefined, không thể điều hướng!");
      return;
    }

    console.log("✅ Movie ID được click:", movie_id);

    const firstEpisode = await movieAPI.getFirstEpisodeBanner(
      navigate,
      movie_id
    );

    if (
      firstEpisode &&
      firstEpisode.movie_id &&
      firstEpisode.current_episode?.episode_id
    ) {
      console.log("🎬 Điều hướng tới tập đầu tiên:", firstEpisode);
      navigate(
        `/film/${firstEpisode.movie_id}/${firstEpisode.current_episode.episode_id}`
      );
    } else {
      console.error(
        "❌ Không tìm thấy tập đầu tiên hoặc dữ liệu không đầy đủ!",
        firstEpisode
      );
    }
  };

  // Cập nhật vị trí video khi idVideo thay đổi
  useEffect(() => {
    if (qcVideoRef.current) {
      qcVideoRef.current.style.transform = `translateX(${idVideo * -100}vw)`;
    }
  }, [idVideo]);
  console.log("bill id", idVideo);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await movieAPI.getBannerQC();
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
              <video
                src={process.env.REACT_APP_API_URL + item.trailer_url}
                autoPlay
                loop
                muted
              />
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
            {bannerQC[idVideo].description.length > 300
              ? bannerQC[idVideo].description.slice(0, 300) + "..."
              : bannerQC[idVideo].description}
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
            <button
              onClick={() => {
                console.log(
                  "🚀 Gọi xem_ngay với ID:",
                  bannerQC[idVideo]?.movie_id
                );
                xem_ngay(bannerQC[idVideo]?.movie_id);
              }}
            >
              Xem ngay
            </button>

            <div>
              <i className="fa-regular fa-lightbulb"></i> Chi tiết
            </div>
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
