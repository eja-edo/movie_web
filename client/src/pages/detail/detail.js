import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./details.scss";
import CreateDisplayList from "../../components/CreateDisplayList/CreateDisplayList";
import FilmList from "../../components/FilmList/FilmList";
import movieAPI from "../../services/movieAPI";
import Review from "../../components/review/review";
import SEO from "../../components/SEO/SEO";
import MovieStructuredData from "../../components/StructuredData/MovieStructuredData";
//adasdasjdlasjdlasjdlkajflkjdlkjflakjsfkljaskfjalkfjalsfjlakfjalkjdlakdjalsjdalskdj
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
        console.log("Movie data trang detail:", response);
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

  const handleNavigate = (type, value) => {
    if (!value) return;

    // Xác định tên tham số query dựa trên type
    let paramName = type;
    if (type === "directors") {
      paramName = "director"; // Chuyển từ "directors" thành "director"
    } else if (type === "actors") {
      paramName = "actor"; // Chuyển từ "actors" thành "actor"
    } else if (type === "genres") {
      paramName = "genre"; // Chuyển từ "genres" thành "genre"
    }

    // Tạo URL với tham số query đúng
    navigate(`/category/${type}?${paramName}_id=${value}`);
  };

  // Prepare SEO data if movie is available
  const seoData = movie ? {
    title: `${movie.title} (${movie.release_date?.substring(0, 4) || ''}) - Xem phim Full HD | SMovie`,
    description: movie.description ?
      `${movie.description.substring(0, 150)}... | Xem phim ${movie.title} chất lượng Full HD tại SMovie với ${movie.actors?.length || 0} diễn viên nổi tiếng` :
      `Xem phim ${movie.title} chất lượng Full HD, thuyết minh, lồng tiếng Việt tại SMovie. Phim ${movie.genres?.map(genre => genre.name).join(', ') || ''} hay nhất ${movie.release_date?.substring(0, 4) || 'năm nay'}.`,
    keywords: movie.genres ?
      `${movie.title}, ${movie.genres.map(genre => genre.name).join(', ')}, ${movie.actors?.map(actor => actor.name).join(', ') || ''}, phim ${movie.release_date?.substring(0, 4) || ''}, xem phim online, phim HD, phim lẻ, phim bộ` :
      `${movie.title}, phim hay, xem phim online, phim HD, phim lẻ, phim bộ`,
    ogType: 'video.movie',
    ogImage: `${process.env.REACT_APP_API_URL}${movie.poster_url?.replace(/\\/g, "/")}`,
    ogUrl: `https://smovie.fun/detail/${id}`,
    canonicalUrl: `https://smovie.fun/detail/${id}`,
  } : {};

  return (
    <div id="detail">
      {/* Add SEO component with movie-specific data */}
      {movie && <SEO {...seoData} />}

      {/* Add structured data for movie */}
      {movie && <MovieStructuredData movie={movie} />}

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

            {/* <a href="#">Xem ngay</a>
            <button>Tập phim</button> */}

            <div id="infoMovie">
              <div className="info-left">
                <div className="ratings">
                  <span className="stars">
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <span
                          key={index}
                          className={
                            index < Math.round(movie.rating)
                              ? "star-filled"
                              : "star-empty"
                          }
                        >
                          ★
                        </span>
                      ))}
                  </span>{" "}
                  ({movie.rating?.toFixed(1) || "0.0"}/5.0)
                </div>
                <p>{`${movie.release_date} | ${movie.runtime} phút | ${movie.views} lượt xem`}</p>
                <p id="description">{movie.description || "Chưa có mô tả"}</p>
              </div>

              <div className="info-right">
                {/* Thể loại */}
                <p>
                  <b className="info-right_title">Thể loại:</b>{" "}
                  {Array.isArray(movie.genres) && movie.genres.length > 0
                    ? movie.genres
                      .map((genre) => (
                        <span
                          key={genre.genre_id}
                          className="clickable"
                          onClick={() =>
                            handleNavigate("genre", genre.genre_id)
                          }
                        >
                          {genre.name}
                        </span>
                      ))
                      .reduce((prev, curr) => [prev, ", ", curr])
                    : "Chưa cập nhật"}
                </p>

                {/* Quốc gia */}
                <p>
                  <b className="info-right_title">Quốc gia:</b>{" "}
                  {Array.isArray(movie.nations) && movie.nations.length > 0 ? (
                    movie.nations
                      .map((nation) => (
                        <span
                          key={nation.nation_id}
                          className="clickable"
                          onClick={() =>
                            handleNavigate("nation", nation.nation_id)
                          }
                        >
                          {nation.name}
                        </span>
                      ))
                      .reduce((prev, curr) => [prev, ", ", curr])
                  ) : movie.nation ? (
                    <span
                      className="clickable"
                      onClick={() =>
                        handleNavigate("nation", movie.nation.nation_id)
                      }
                    >
                      {movie.nation.name}
                    </span>
                  ) : (
                    "Chưa cập nhật"
                  )}
                </p>

                {/* Đạo diễn */}
                <p>
                  <b className="info-right_title">Đạo diễn:</b>{" "}
                  {movie.directors && movie.directors.length > 0
                    ? movie.directors
                      .map((director) => (
                        <span
                          key={director.director_id}
                          className="clickable"
                          onClick={() =>
                            handleNavigate("directors", director.director_id)
                          }
                        >
                          {director.name}
                        </span>
                      ))
                      .reduce((prev, curr) => [prev, ", ", curr])
                    : "Chưa cập nhật"}
                </p>

                {/* Diễn viên */}
                <p>
                  <b className="info-right_title">Diễn viên:</b>{" "}
                  {movie.actors && movie.actors.length > 0
                    ? movie.actors
                      .map((actor) => (
                        <span
                          key={actor.actor_id}
                          className="clickable"
                          onClick={() =>
                            handleNavigate("actors", actor.actor_id)
                          }
                        >
                          {actor.name}
                        </span>
                      ))
                      .reduce((prev, curr) => [prev, ", ", curr])
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

            <Review movie_id={id} />

            <div className="container_display">
              <h2>PHIM LIÊN QUAN</h2>
              {films && <CreateDisplayList films={films} />}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="height_list">{films && <FilmList films={films} />}</div>
    </div>
  );
};

export default MovieDetails;
