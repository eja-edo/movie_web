import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./film.scss";
import CreateDisplayList from "../../components/CreateDisplayList/CreateDisplayList.js";
import FilmList from "../../components/FilmList/FilmList.js";
import checkRefreshToken from "../../services/token.js";
import VideoPlayer from "../../components/VideoPlayer.js";
import { fetchVideoData, fetchDisplayList } from "../../services/movieAPI.js";

// const Film = ({ movieId, episodeNum }) => {
//     // const videoUrl = `http://localhost:8000/service/film/`; // Endpoint của API Django

//     // const getVideoUrl = async () => {
//     //     try {
//     //         const response = await fetch(videoUrl, {
//     //             method: "POST",
//     //             headers: {
//     //                 "Content-Type": "application/json",
//     //                 "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2MDU1ODAxLCJpYXQiOjE3MzYwNTIyMDEsImp0aSI6IjBkODE4ZTEwOTA4ODRlMzVhODU3NWM2MWM4ODhjOTIwIiwidXNlcl9pZCI6MX0.NfJzK7fvtJBj0b5vDFXsGyZpK6CxF53ONCNRJkOqu80",
//     //             },
//     //             body: JSON.stringify({ movie_id: 1, episode_num: 1 }),
//     //         });

//     //         if (!response.ok) {
//     //             throw new Error("Không thể tải video");
//     //         }

//     //         const videoBlob = await response.blob();
//     //         return URL.createObjectURL(videoBlob); // Tạo URL tạm từ blob
//     //     } catch (error) {
//     //         console.error("Lỗi khi tải video:", error);
//     //     }
//     // };

//     // React.useEffect(() => {
//     //     getVideoUrl().then((url) => {
//     //         const videoElement = document.getElementById("videoPlayer");
//     //         videoElement.src = url;
//     //     });
//     // }, [movieId, episodeNum]);

//     return <video
//         id="videoPlayer"
//         controls
//         style={{ width: "100%" }}
//         src="http://127.0.0.1:8000/service/api/video/?path=assets/short-video/Teaser_dark_gathering (11).mp4"
//     />;
// };
// export default Film;

function Film() {
  const navigate = useNavigate();
  const { id1, id2 } = useParams();
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [film, setFilm] = useState({
    episode_data: {
      url_video: "",
    },
  });
  //    const videoRef = useRef(null);
  console.log(id1, id2);

  // const VideoPlayer = ({ movieId, episodeNum }) => {
  //     const videoRef = useRef(null);
  //     const [isLoading, setIsLoading] = useState(true);
  //     const [error, setError] = useState(null);

  //     useEffect(() => {
  //         const fetchVideo = async () => {
  //             try {
  //                 setIsLoading(true);

  //                 const response = await fetch("/api/getFilm/", {
  //                     method: "POST",
  //                     headers: {
  //                         "Content-Type": "application/json",
  //                     },
  //                     body: JSON.stringify({
  //                         movie_id: movieId,
  //                         episode_num: episodeNum,
  //                     }),
  //                 });

  //                 if (!response.ok) {
  //                     const errorData = await response.json();
  //                     throw new Error(errorData.error || "Lỗi không xác định");
  //                 }

  //                 // MediaSource API setup
  //                 const video = videoRef.current;
  //                 const mediaSource = new MediaSource();

  //                 video.src = URL.createObjectURL(mediaSource);

  //                 mediaSource.addEventListener("sourceopen", () => {
  //                     const sourceBuffer = mediaSource.addSourceBuffer(
  //                         'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
  //                     );

  //                     // Stream dữ liệu
  //                     const reader = response.body.getReader();
  //                     const streamData = async () => {
  //                         const { done, value } = await reader.read();
  //                         if (done) {
  //                             mediaSource.endOfStream();
  //                             setIsLoading(false);
  //                             return;
  //                         }
  //                         sourceBuffer.appendBuffer(value);
  //                         sourceBuffer.addEventListener("updateend", streamData, { once: true });
  //                     };

  //                     streamData();
  //                 });
  //             } catch (err) {
  //                 setError(err.message);
  //                 setIsLoading(false);
  //             }
  //         };

  //         fetchVideo();
  //     }, [movieId, episodeNum]);
  // useEffect(() => {
  //     // const fetchVideoData = async (id1, id2, navigate, retry = false) => {
  //     //     try {
  //     //         const accessToken = localStorage.getItem('accessToken');
  //     //         const response = await fetch(`http://localhost:8000/service/film/`, {
  //     //             method: 'POST',
  //     //             headers: {
  //     //                 "Content-Type": "application/json",
  //     //                 "Authorization": `Bearer ${accessToken}`,
  //     //             },
  //     //             body: JSON.stringify({
  //     //                 "movie_id": id1,
  //     //                 "episode_num": id2
  //     //             })
  //     //         });

  //     //         if (response.ok) {
  //     //             const mediaSource = new MediaSource();
  //     //             const video = videoRef.current;

  //     //             // Đảm bảo `MediaSource` có sẵn sàng không
  //     //             if (!('MediaSource' in window)) {
  //     //                 console.error('MediaSource không được hỗ trợ trong trình duyệt này.');
  //     //                 return;
  //     //             }

  //     //             // Kiểm tra codec
  //     //             const mimeType = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
  //     //             if (!MediaSource.isTypeSupported(mimeType)) {
  //     //                 console.error(`Codec ${mimeType} không được hỗ trợ.`);
  //     //                 return;
  //     //             }

  //     //             video.src = URL.createObjectURL(mediaSource);

  //     //             mediaSource.addEventListener('sourceopen', () => {
  //     //                 console.log('MediaSource is open');

  //     //                 let sourceBuffer;
  //     //                 try {
  //     //                     sourceBuffer = mediaSource.addSourceBuffer(mimeType);
  //     //                     console.log('SourceBuffer đã được thêm.');
  //     //                 } catch (e) {
  //     //                     console.error('Failed to add SourceBuffer:', e);
  //     //                     return;
  //     //                 }

  //     //                 const reader = response.body.getReader();

  //     //                 function push() {
  //     //                     reader.read().then(({ done, value }) => {
  //     //                         if (done) {
  //     //                             if (mediaSource.readyState === 'open') {
  //     //                                 mediaSource.endOfStream();
  //     //                                 console.log('End of stream');
  //     //                             }
  //     //                             return;
  //     //                         }

  //     //                         sourceBuffer.addEventListener('updateend', () => {
  //     //                             const buffered = sourceBuffer.buffered;
  //     //                             let totalBuffered = 0;

  //     //                             for (let i = 0; i < buffered.length; i++) {
  //     //                                 totalBuffered += buffered.end(i) - buffered.start(i);
  //     //                             }

  //     //                             console.log('Total buffered duration in seconds:', totalBuffered);
  //     //                             console.log('Buffered ranges:', buffered);
  //     //                             push();
  //     //                         }, { once: true });
  //     //                         sourceBuffer.addEventListener('error', (e) => {
  //     //                             console.error('SourceBuffer error:', e);
  //     //                             if (e.target) {
  //     //                                 console.error('Error details:', e.target.error);
  //     //                             }
  //     //                         });
  //     //                         try {
  //     //                             try {
  //     //                                 console.log(value)
  //     //                                 sourceBuffer.appendBuffer(value);
  //     //                                 console.log(sourceBuffer);

  //     //                             } catch (e) {
  //     //                                 console.error('Failed to append buffer:', e.message, e);
  //     //                             }
  //     //                         } catch (e) {
  //     //                             console.error('Failed to append buffer:', e);
  //     //                         }
  //     //                     }).catch(err => {
  //     //                         console.error('Error while reading the stream:', err);
  //     //                     });
  //     //                 }
  //     //                 push();
  //     //             });

  //     //         } else if (response.status === 401 && !retry) {
  //     //             const refreshSuccess = await checkRefreshToken(navigate);
  //     //             if (refreshSuccess) {
  //     //                 fetchVideoData(id1, id2, navigate, true);
  //     //             }
  //     //         } else {
  //     //             console.error('Movie has not been updated yet!');
  //     //         }

  //     //     } catch (error) {
  //     //         console.error('Network error occurred.');
  //     //         console.error('Error fetching film data:', error);
  //     //     }
  //     // }

  //     // fetchVideoData(id1, id2, navigate);

  //     // const video = videoRef.current;

  // }, [navigate, id1, id2]);
  const [films, setfilms] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDisplayList(`${process.env.REACT_APP_API_URL}/service/get_thinhhanh/`)
        setfilms(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [navigate]);

  // if (isLoading) { return (<div style={{ paddingTop: '100px' }}>is loading...</div>) }
  // if (error) { return (<div style={{ paddingTop: '100px' }}>{error}</div>) }

  const handleMotaClick = () => {
    // Thực hiện logic "Xem thêm thông tin" ở đây
    // Ví dụ: hiển thị modal, chuyển hướng đến trang chi tiết, ...
    // console.log('Xem thêm thông tin về phim:', 'film.title');
  };

  const handleTapClick = (episodeNumber) => {
    // Thực hiện logic khi click vào số tập
    if (!(episodeNumber == id2)) {
      navigate(`/film/${id1}/${episodeNumber}`);
    }
  };
  return (
    <div id="container_film">
      <div id="film">
        <video
          src="http://127.0.0.1:8000/service/api/video/?path=assets/short-video/Teaser_dark_gathering (11).mp4"
          // src={film}
          controls
          style={{
            width: "98%",
            boxSizing: "border-box",
            borderRadius: "5px",
            margin: "auto",
          }}
        />
        <div id="ten">
          {/* <h2>{film['episode_data']['title']}</h2> */}
          <p>{"film.info"}</p>
        </div>
        <button onClick={handleMotaClick} id="mota">
          Xem thêm thông tin
        </button>
        <div id="thongtin">
          <div>{/* <img src={''} alt={'film.title'} /> */}</div>
          <p>{"film.description"}</p>
        </div>

        <fieldset id="tap">
          <legend>
            <h3>Tập phim</h3>
          </legend>
          {/* {film['episodes_number']?.map((item) => (
                        <button onClick={() => { handleTapClick(item) }}>tập {item}</button>
                    ))} */}
        </fieldset>
        <div className="cmt">
          <h2>Bình Luận</h2>
        </div>

        <div className="container_display">
          <h2>Phim đề cử</h2>
          {films ? <CreateDisplayList films={films} /> : <></>}
        </div>
      </div>

      <div className="height_list">
        <h2 id="right-list">Phim đề cử</h2>

        {films ? <FilmList films={films} /> : <></>}
      </div>
    </div>
    // ... Phần footer và import data
  );
}

export default Film;

// function mota() {
//     var div = document.getElementById('thongtin')
//     if (div.style.height == '0px') {
//         div.style.height = '400px';
//         div.style.borderBottom = 'gray 1px solid';
//     }

//     else {
//         div.style.height = '0px';
//         div.style.borderBottom = 'none';
//     }

// }

// // hàm tạo ra một ô trưng bày phim
// function taoLink(i, img1, video1, content1, name) {
//     // Tạo các phần tử
//     var a = document.createElement('a');
//     var img = document.createElement('img');
//     var divVideo = document.createElement('div');
//     var video = document.createElement('video');
//     var divControl = document.createElement('div');
//     var p1 = document.createElement('p');
//     var div0 = document.createElement('div');
//     var button1 = document.createElement('a');
//     button1.onclick = function () { xem_ngay(this); }
//     var div_a1 = document.createElement('div');
//     var button2 = document.createElement('a');
//     button2.onclick = function () { plus_list(this); }
//     var button3 = document.createElement('a');
//     button3.onclick = function () { chi_tiet(this); }
//     var p = document.createElement('p');

//     // Thiết lập thuộc tính cho các phần tử
//     a.href = "";
//     a.className = "img";
//     a.onmouseout = function () { tatdi(this); };
//     a.onmouseover = function () { molen(this); };

//     img.src = img1;
//     img.alt = "";
//     button1.href = 'film.html';
//     button3.href = 'mtphim.html';

//     divVideo.className = "video";

//     video.src = video1;
//     video.muted = true;
//     video.loop = true;

//     divControl.className = "control";

//     p1.textContent = i;
//     p1.style.display = 'none';

//     div_a1.innerHTML = '<i class="fa-solid fa-play"></i>Xem ngay';
//     div_a1.style.backgroundColor = '#fff';
//     div_a1.style.color = '#111';
//     button1.appendChild(div_a1);
//     button2.innerHTML = '<div><i class="fa-solid fa-plus"></i>Danh sách</div>';
//     button3.innerHTML = '<div><i class="fa-regular fa-lightbulb"></i>Chi tiết</div>';

//     p.textContent = content1;

//     // Thêm các phần tử vào cây DOM
//     divControl.appendChild(p1);
//     div0.appendChild(button1);
//     div0.appendChild(button2);
//     div0.appendChild(button3);
//     divControl.appendChild(div0)
//     divControl.appendChild(p);

//     divVideo.appendChild(video);
//     divVideo.appendChild(divControl);

//     a.appendChild(img);
//     a.appendChild(divVideo);

//     // Thêm phần tử 'a' vào body (hoặc bất kỳ phần tử cha nào bạn muốn)
//     document.querySelector('div[id=' + name + '] div').appendChild(a);
// }

// // mở thông tin tạm của phim khi con trỏ đi qua hình ảnh bằng cách thay đổi giá trị chiều cao từ 0 ( trạng thái tát) sang 258px
// function molen(element) {
//     var div = element.querySelector('div');
//     div.style.height = '258px';
//     var video = div.querySelector('video');
//     video.play();
//     var div_parent = element.parentNode;
//     var index = Array.prototype.indexOf.call(div_parent.children, element)
//     var trans = +getComputedStyle(div).getPropertyValue('--trans').replace('px', '');
//     if ((-trans / 138) === index)
//         element.querySelector('div').style.transform = 'translateX(120px)'
// }
// //đóng video khi co trỏ ra khỏi hình ảnh
// function tatdi(element) {
//     var div = element.querySelector('div');
//     div.style.height = '0px';
//     div.querySelector('video').pause();
// }

// function back(button) {
//     div = button.parentElement.querySelector('div[class=display_list]');
//     var trans = +getComputedStyle(div).getPropertyValue('--trans').replace('px', '');
//     if (trans !== 0) {
//         var width = document.documentElement.clientWidth;
//         if (-trans <= width) {
//             div.style.setProperty('--trans', '0px')
//         }

//         else {
//             trans = trans + width;
//             div.style.setProperty('--trans', '' + trans + 'px')
//         }
//     }
// }
// function next(button) {
//     div = button.parentElement.querySelector('div[class=display_list]');
//     var trans = +getComputedStyle(div).getPropertyValue('--trans').replace('px', '');
//     if (trans > -1242) {
//         var width = document.querySelector('div').clientWidth;
//         trans = (Math.floor((trans - width) / 138) + 2) * 138;
//         div.style.setProperty('--trans', '' + trans + 'px')
//     }

// }

// for (var i = 0; i < moinhat.length; i++) {
//     taoLink(moinhat[i], linkList['link_img'][moinhat[i]], linkList['link_short_video'][moinhat[i]], '' + linkList['year'][moinhat[i]] + ' | ' + linkList['lim'][moinhat[i]] + ' | ' + linkList['country'][moinhat[i]] + ' | ' + linkList['time'][moinhat[i]] + ' | ' + linkList['difinition'][moinhat[i]] + ' ', 'hh');
// }

// for (var i = 0; i < moinhat.length; i++) {
//     // Tạo các phần tử HTML
//     let a = document.createElement('a');
//     let div1 = document.createElement('div');
//     let img = document.createElement('img');
//     let video = document.createElement('video');
//     let div2 = document.createElement('div');
//     let h4 = document.createElement('h4');
//     let div3 = document.createElement('div');
//     let p0 = document.createElement('p');
//     let p1 = document.createElement('p');
//     let p2 = document.createElement('p');

//     // Đặt thuộc tính cho các phần tử
//     a.href = 'mtphim.html';
//     a.className = 'max_scanner_img';
//     img.src = linkList['link_img'][moinhat[i]];
//     video.src = linkList['link_short_video'][moinhat[i]];
//     video.loop = true;
//     video.autoplay = true;
//     video.muted = true;
//     h4.textContent = linkList['name'][moinhat[i]];
//     p0.textContent = moinhat[i];
//     p0.style.display = 'none';
//     p1.textContent = '' + linkList['lim'][moinhat[i]] + ' ' + linkList['country'][moinhat[i]] + '';
//     p2.textContent = '' + linkList['time'][moinhat[i]] + ' | ' + linkList['difinition'][moinhat[i]] + '';

//     // Gắn các phần tử con vào phần tử cha
//     div3.appendChild(p0);
//     div3.appendChild(p1);
//     div3.appendChild(p2);
//     div2.appendChild(h4);
//     div2.appendChild(div3);
//     div1.appendChild(img);
//     div1.appendChild(video);
//     div1.appendChild(div2);
//     a.appendChild(div1);

//     // Thêm phần tử a vào body (hoặc bất kỳ phần tử cha nào khác)
//     document.querySelector('div[id=hh2]').appendChild(a);
// }
