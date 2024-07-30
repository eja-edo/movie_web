import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './details.scss';
import CreateDisplayList from '../../components/CreateDisplayList/CreateDisplayList';
import checkRefreshToken from '../../components/token';
import FilmList from '../../components/FilmList/FilmList';
import { fetchDisplayList, fetchFilmData } from '../../services/movieAPI';


const MovieDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams(); // Lấy movieId từ URL
    const [movie, setMovie] = useState(null);
    const [films, setFilms] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const getfetchMovie = async () => {
            try {
                const response = await fetchFilmData(id, navigate)
                setMovie(response)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        getfetchMovie()
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchDisplayList('http://127.0.0.1:8000/service/get_thinhhanh/')
                setFilms(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [navigate]);

    if (loading) { return (<div>is loading...</div>) }
    if (error) { return (<div>{error}</div>) }

    // Hàm xử lý logic chuyển slide (nếu cần)
    const handleBack = () => {
        // ...
    };

    const handleNext = () => {
        // ...
    };

    // Hàm xử lý thêm bình luận (nếu cần)
    const handleAddComment = () => {
        // ...
    };
    const handleTapClick = (episodeNumber) => {
        // Thực hiện logic khi click vào số tập
        navigate(`/film/${id}/${episodeNumber}`)
    }
    return (
        <div id='detail'>
            <div id="movie-container">
                {movie ? (
                    <>
                        <img src={movie.poster_url} alt={movie.title} className="banner" />
                        <h1>{movie.title}</h1>
                        <a href="#">Xem ngay</a>
                        <button>Tập phim</button>
                        <div id='infoMovie'>
                            <div>
                                <div className="ratings">
                                    <span className="stars">★★★★★</span> ({movie.rating})
                                </div>
                                <p>
                                    {`${movie['release_date']} | ${movie['runtime']} | ${movie['views']}`}
                                </p>
                                <p id='description'>{movie.description}</p>
                            </div>

                            <div className="info">
                                <p>
                                    <b>Thể loại:</b> {movie.genre}
                                </p>
                                <p>
                                    <b>Đạo điễn:</b> {movie.directors[0] ? movie.directors.join(', ') : 'Chưa được cập nhật'}
                                </p>
                                <p>
                                    <b>Diễn viên:</b> {movie.actors[0] ? movie.actors.join(', ') : 'Chưa được cập nhật'}
                                </p>
                            </div>

                        </div>
                        <fieldset id="tap">
                            <legend>
                                <h3>Tập phim</h3>
                            </legend>
                            {movie['episodes_num']?.map((item) => (
                                <button onClick={() => { handleTapClick(item) }}>tập {item}</button>
                            ))}
                        </fieldset>
                    </>
                ) : (
                    <p>Loading...</p>
                )}

                <div className='container_display'>
                    <h2>PHIM LIÊN QUAN</h2>
                    {films ? <CreateDisplayList films={films} /> : <></>}
                </div>

                <p>Bình luận</p>
                <div id="binh_luan">
                    <div id="nhap_bl">
                        <i className="fa-solid fa-user"></i>{' '}
                        <textarea
                            name='comment'
                            id='commnet'
                            placeholder="Thêm bình luận..."
                            onChange={handleAddComment}
                        ></textarea>
                    </div>
                </div>
            </div>

            <div className='height_list'>{films ? <FilmList films={films} /> : <></>}</div>
        </div>
    );
};

export default MovieDetails;