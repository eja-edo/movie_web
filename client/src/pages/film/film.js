import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./film.scss";
import CreateDisplayList from "../../components/CreateDisplayList/CreateDisplayList.js";
import FilmList from "../../components/FilmList/FilmList.js";
import movieAPI from "../../services/movieAPI.js";

function Film() {
  const navigate = useNavigate();
  const { id1, id2 } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState("");
  const [movie, setMovie] = useState(null);
  const [films, setFilms] = useState(null);

  useEffect(() => {
    console.log("Dữ liệu đã cập nhật:", data);
  }, [data]); // Chạy mỗi khi `data` thay đổi
  console.log("Dữ liệu đã cập nhật:", id1, id2);
  useEffect(() => {
    let isMounted = true; // Tránh cập nhật state khi component bị unmount

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Chạy song song để giảm thời gian chờ
        const [videoData, movieData] = await Promise.all([
          movieAPI.getVideoData(id1, id2, navigate),
          movieAPI.getFilmData(id1, navigate),
        ]);

        if (isMounted) {
          setData(videoData);
          setMovie(movieData);
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
      isMounted = false; // Cleanup function
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

  const handleMotaClick = () => {
    console.log("Xem thêm thông tin về phim:", movie?.title);
  };

  const handleTapClick = (episode_id) => {
    if (episode_id !== id2) {
      navigate(`/film/${id1}/${episode_id}`);
    }
  };

  if (isLoading) return <div style={{ paddingTop: "100px" }}>Đang tải...</div>;
  if (error) return <div style={{ paddingTop: "100px" }}>{error}</div>;

  return (
    <div id="container_film">
      <div id="film">
        {/* Video Player */}

        <video
          src={process.env.REACT_APP_API_URL + data.current_episode.url_video}
          controls
          style={{
            width: "98%",
            boxSizing: "border-box",
            borderRadius: "5px",
            margin: "auto",
          }}
        />

        {/* Thông tin phim */}
        <div id="ten">
          <h2>{movie?.title || "Tên phim đang cập nhật"}</h2>
        </div>

        <button onClick={handleMotaClick} id="mota">
          Xem thêm thông tin
        </button>

        <div id="thongtin">
          {movie?.poster_url && (
            <img
              src={`${process.env.REACT_APP_API_URL}${movie.poster_url.replace(
                /\\/g,
                "/"
              )}`}
              alt={movie.title}
              className="banner"
            />
          )}
          <p>{movie?.description || "Chưa có mô tả"}</p>
        </div>

        {/* Danh sách tập phim */}
        <fieldset id="tap">
          <legend>
            <h3>Tập phim</h3>
          </legend>
          {movie?.episodes?.length ? (
            movie.episodes.map((ep) => (
              <button
                key={ep.episode_id}
                onClick={() => handleTapClick(ep.episode_id)}
                style={{
                  background: ep.episode_id === id2 ? "#ffcc00" : "#ddd",
                  margin: "5px",
                  padding: "8px",
                  borderRadius: "5px",
                }}
              >
                Tập {ep.episode_number}
              </button>
            ))
          ) : (
            <p>Chưa có tập phim.</p>
          )}
        </fieldset>

        {/* Bình luận */}
        <p>Bình luận</p>
        <div id="binh_luan">
          <div id="nhap_bl">
            <i className="fa-solid fa-user"></i>{" "}
            <textarea
              name="comment"
              id="comment"
              placeholder="Thêm bình luận..."
            />
          </div>
        </div>

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
