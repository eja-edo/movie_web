import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import "./film.scss";
import CreateDisplayList from "../../components/CreateDisplayList/CreateDisplayList.js";
import FilmList from "../../components/FilmList/FilmList.js";
import movieAPI from "../../services/movieAPI.js";

function Film() {
    const navigate = useNavigate();
    const {id1, id2} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState("");

    const [films, setFilms] = useState(null);

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
                const [videoData] = await Promise.all([movieAPI.getVideoData(id1, id2, navigate)]);

                if (isMounted) {
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
                const response = await movieAPI.getDisplayList(`${process.env.REACT_APP_API_URL}/api/movies/get_thinhhanh/`);
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
        // Navigate to the selected episode
        // Assuming the route follows the pattern /film/:id1/:id2
        navigate(`/film/${id1}/${episodeId}`);
    };
    const handleMotaClick = () => {
        console.log("Xem thêm thông tin về phim:", data?.title);
    };

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
                    <h2>{data?.current_episode.movie_title || "Tên phim đang cập nhật"}</h2>
                </div>

                <button onClick={handleMotaClick} id="mota">
                    Xem thêm thông tin
                </button>

                <div id="thongtin">
                    {data?.current_episode.poster_url && <img src={`${process.env.REACT_APP_API_URL}${data.poster_url.replace(/\\/g, "/")}`} alt={data.title} className="banner" />}
                    <p>{data?.current_episode.description || "Chưa có mô tả"}</p>
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
                                    // onClick={() => handleTapClick(ep.episode_id)}
                                    style={{
                                        background: isActive ? "#FFE792" : "#ddd",
                                        color: isActive ? "#333" : "#333",
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
                <p>Bình luận</p>
                <div id="binh_luan">
                    <div id="nhap_bl">
                        <i className="fa-solid fa-user"></i> <textarea name="comment" id="comment" placeholder="Thêm bình luận..." />
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
