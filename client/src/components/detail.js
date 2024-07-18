import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/details.css'; // Nhớ import file CSS của bạn
import CreateDisplayList from './CreateDisplayList';



const MovieDetails = () => {
    const { movieId } = useParams(); // Lấy movieId từ URL

    const [movie, setMovie] = useState(null);
    const [relatedMovies, setRelatedMovies] = useState([]);

    useEffect(() => {
        // Fetch dữ liệu phim từ API dựa trên movieId
        const fetchMovieDetails = async () => {
            // Thay thế API_ENDPOINT bằng đường dẫn API thực tế
            const response = await fetch(`API_ENDPOINT/${movieId}`);
            const data = await response.json();
            setMovie(data);
        };

        // Fetch dữ liệu phim liên quan
        const fetchRelatedMovies = async () => {
            // Thay thế API_ENDPOINT bằng đường dẫn API thực tế
            const response = await fetch('API_ENDPOINT/related-movies');
            const data = await response.json();
            setRelatedMovies(data);
        };

        fetchMovieDetails();
        fetchRelatedMovies();
    }, [movieId]);

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

    return (
        <div id='detail'>
            <div id="movie-container">
                {movie ? (
                    <>
                        <img src={movie.imageUrl} alt={movie.title} className="banner" />
                        <h1>{movie.title}</h1>

                        <a href="#">Xem ngay</a> {/* Thay thế # bằng đường dẫn phù hợp */}
                        <button>Tập phim</button>
                        <div className="ratings">
                            <span className="stars">★★★★★</span> ({movie.ratingsCount})
                        </div>

                        <div className="info">
                            <p>
                                <b>Thể loại:</b> {movie.genres.join(', ')}
                            </p>
                            <p>
                                <b>Diễn viên:</b> {movie.actors.join(', ')}
                            </p>
                            {/* ... Hiển thị các thông tin khác của phim */}
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}

                <h2>PHIM LIÊN QUAN</h2>
                <div className='container_display'>
                    <CreateDisplayList url='http://127.0.0.1:8000/service/get_thinhhanh/' />
                </div>

                <p>Bình luận</p>
                <div id="binh_luan">
                    <div id="nhap_bl">
                        <i className="fa-solid fa-user"></i>{' '}
                        <textarea
                            name
                            id
                            placeholder="Thêm bình luận..."
                            onChange={handleAddComment}
                        ></textarea>
                    </div>
                </div>
            </div>

            {/* ... Phần còn lại của component */}
        </div>
    );
};

export default MovieDetails;