import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./film.scss";
import CreateDisplayList from "../../components/CreateDisplayList/CreateDisplayList.js";
import FilmList from "../../components/FilmList/FilmList.js";
import movieAPI from "../../services/movieAPI.js";
import VideoPlayer from "../../components/VideoPlayer.js";
import Comment from "../../components/comment/comment";

function Film() {
  const navigate = useNavigate();
  const { id1, id2 } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    if (!id1 || !id2) {
      console.error("❌ LỖI: id1 hoặc id2 bị undefined!", id1, id2);
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const videoData = await movieAPI.getVideoData(id1, id2, navigate);
        if (isMounted) {
          console.log("Dữ liệu video:", videoData);
          setData(videoData);
        }
      } catch (err) {
        if (isMounted) setError("Lỗi khi tải dữ liệu phim.");
        console.error("Lỗi tải dữ liệu:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [id1, id2, navigate]);

  useEffect(() => {
    let isMounted = true;

    const fetchFilmList = async () => {
      try {
        const response = await movieAPI.getDisplayList(
          `${process.env.REACT_APP_API_URL}/api/movies/get_thinhhanh/`
        );
        if (isMounted) setFilms(response);
      } catch (err) {
        console.error("Lỗi tải danh sách phim:", err);
      }
    };

    fetchFilmList();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleTapClick = (episodeId) => {
    navigate(`/film/${id1}/${episodeId}`);
  };

  const handleMotaClick = () => {
    console.log("Xem thêm thông tin về phim:", data?.title);
  };

  if (isLoading) return <div>Đang tải dữ liệu phim...</div>;
  if (error) return <div>{error}</div>;

  const episode = data?.current_episode;

  return (
    <div id="container_film">
      <div id="film">
        {/* ✅ Video Player (MP4 + HLS) */}
        {episode?.url_video ? (
          <VideoPlayer
            videoSrc={`${process.env.REACT_APP_API_URL}${episode.url_video}`}
          />
        ) : (
          <p>Không có video để phát.</p>
        )}

        {/* Thông tin phim */}
        <div id="ten">
          <h2>{episode?.movie_title || "Tên phim đang cập nhật"}</h2>
        </div>

        <button onClick={handleMotaClick} id="mota">
          Xem thêm thông tin
        </button>

        <div id="thongtin">
          {data?.poster_url && (
            <img
              src={`${process.env.REACT_APP_API_URL}${data.poster_url.replace(
                /\\/g,
                "/"
              )}`}
              alt={data.title}
              className="banner"
            />
          )}
          <p>{episode?.description || "Chưa có mô tả"}</p>
        </div>

        {/* Danh sách tập phim */}
        <fieldset id="tap">
          <legend>
            <h3>Tập phim</h3>
          </legend>
          {data?.episodes_list?.length ? (
            data.episodes_list.map((ep) => {
              const isActive = parseInt(ep.episode_id) === parseInt(id2);
              return (
                <button
                  key={ep.episode_id}
                  onClick={() => handleTapClick(ep.episode_id)}
                  style={{
                    background: isActive ? "#FFE792" : "#ddd",
                    color: "#333",
                    fontWeight: isActive ? "bold" : "normal",
                    margin: "5px",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                    transition: "0.3s ease-in-out",
                  }}
                >
                  Tập {ep.episode_number}
                </button>
              );
            })
          ) : (
            <p>Chưa có tập phim.</p>
          )}
        </fieldset>

        {/* Bình luận */}
        <Comment episode_id={id2} />

        {/* Phim đề cử */}
        <div className="container_display">
          <h2>Phim đề cử</h2>
          {films && <CreateDisplayList films={films} />}
        </div>
      </div>

      {/* Danh sách phim đề cử */}
      <div className="height_list">
        <h2 id="right-list">Phim đề cử</h2>
        {films && <FilmList films={films} />}
      </div>
    </div>
  );
}

export default Film;
