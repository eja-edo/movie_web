import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./details.scss";
import CreateDisplayList from "../../components/CreateDisplayList/CreateDisplayList";
import FilmList from "../../components/FilmList/FilmList";
import movieAPI from "../../services/movieAPI";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy movieId từ URL
  const [movie, setMovie] = useState(null);
  const [films, setFilms] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await movieAPI.getFilmData(id, navigate);
        setMovie(response);
        console.log(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, [id, navigate]); // Cập nhật dependency để tránh gọi API vô hạn

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await movieAPI.getDisplayList(
          `${process.env.REACT_APP_API_URL}/api/movies/get_thinhhanh/`
        );
        setFilms(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const handleTapClick = (episode_id) => {
    navigate(`/film/${id}/${episode_id}`);
  };

  return (
    <div id="detail">
      <div id="movie-container">
        {movie ? (
          <>
            <img
              src={`${process.env.REACT_APP_API_URL}${movie.poster_url.replace(
                /\\/g,
                "/"
              )}`}
              alt={movie.title}
              className="banner"
            />
            <h1>{movie.title}</h1>

            <a href="#">Xem ngay</a>
            <button>Tập phim</button>

            <div id="infoMovie">
              <div>
                <div className="ratings">
                  <span className="stars">★★★★★</span> ({movie.rating})
                </div>
                <p>
                  {`${movie.release_date} | ${movie.runtime} phút | ${movie.views} lượt xem`}
                </p>
                <p id="description">{movie.description || "Chưa có mô tả"}</p>
              </div>

              <div className="info">
                <p>
                  <b>Thể loại:</b>{" "}
                  {movie.genres ? movie.genres.join(", ") : "Chưa cập nhật"}
                </p>
                <p>
                  <b>Đạo diễn:</b>{" "}
                  {movie.directors && movie.directors.length > 0
                    ? movie.directors
                        .map((director) => director.name)
                        .join(", ") // ✅ Đúng!
                    : "Chưa cập nhật"}
                </p>

                <p>
                  <b>Diễn viên:</b>{" "}
                  {movie.actors.length
                    ? movie.actors.map((a) => a.name).join(", ")
                    : "Chưa cập nhật"}
                </p>
              </div>
            </div>

            <fieldset id="tap">
              <legend>
                <h3>Tập phim</h3>
              </legend>
              {movie.episodes.map((item) => (
                <button
                  key={item.episode_id}
                  onClick={() => handleTapClick(item.episode_id)}
                >
                  Tập {item.episode_number}
                </button>
              ))}
            </fieldset>
          </>
        ) : (
          <p>Loading...</p>
        )}

        <div className="container_display">
          <h2>PHIM LIÊN QUAN</h2>
          {films && <CreateDisplayList films={films} />}
        </div>

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
      </div>

      <div className="height_list">{films && <FilmList films={films} />}</div>
    </div>
  );
};

export default MovieDetails;
