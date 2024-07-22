
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/film.scss';
import CreateDisplayList from './CreateDisplayList';
import FilmList from './FilmList';
import checkRefreshToken from './token.js';
function Film() {

    const navigate = useNavigate();
    const [film, setFilm] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state
    const url = window.location.href; // Hoặc window.location.href
    const parts = url.split("/");
    const id = parts[parts.length - 1].substring(1);
    console.log(id)
    useEffect(() => {
        const fetchFilmData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await fetch(`http://localhost:8000/service/film/`, { // Use template literal
                    method: 'POST', // Use GET request to fetch film details
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        "movie_id": id
                    })
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result.length === 0) {
                        setError('Movie has not been updated yet!')
                        setFilm(null)

                    } else {
                        setFilm(result[0]);
                        setError(null);
                    }

                } else if (response.status === 401) {
                    // Token might be expired, try refreshing
                    const refreshSuccess = await checkRefreshToken(navigate); // Use the utility function
                    if (refreshSuccess) {
                        // If refresh is successful, retry fetching film data
                        fetchFilmData();
                    }
                } else {
                    setError('Movie has not been updated yet!');
                }

            } catch (error) {
                setError('Network error occurred.');
                console.error('Error fetching film data:', error);
            }
            finally {
                setIsLoading(false)
            }
        };

        fetchFilmData();
    }, [navigate]); // Fetch data when filmId changes
    if (isLoading) {
        return <div id='container_film'><div>Loading...</div></div>;
    }

    if (error) {
        return <div id='container_film'><div>Error: {error}</div></div>;
    }

    const handleMotaClick = () => {
        // Thực hiện logic "Xem thêm thông tin" ở đây
        // Ví dụ: hiển thị modal, chuyển hướng đến trang chi tiết, ...
        console.log('Xem thêm thông tin về phim:', 'film.title');
    };

    const handleTapClick = (episodeNumber) => {
        // Thực hiện logic khi click vào số tập
        console.log('Chọn tập:', episodeNumber);
    };

    return (
        <div id='container_film'>
            <div id="film">
                <video
                    src={film['url_video']}
                    controls
                    style={{
                        width: '98%',
                        border: 'gray 3px solid',
                        boxSizing: 'border-box',
                        borderRadius: '5px',
                        margin: 'auto',
                    }}
                />
                <div id="ten">
                    <h2>{'film.title'}</h2>
                    <p>{'film.info'}</p>
                </div>
                <button onClick={handleMotaClick} id="mota">
                    Xem thêm thông tin
                </button>
                <div id="thongtin">
                    <div>
                        <img src={''} alt={'film.title'} />
                    </div>
                    <p>{'film.description'}</p>
                </div>

                <fieldset id="tap">
                    <legend>
                        <h3>Tập phim</h3>
                    </legend>
                    {Array.from({ length: 'film.episodes' }).map((_, index) => (
                        <a key={index} href="#" onClick={() => handleTapClick(index + 1)}>
                            <div>{index + 1}</div>
                        </a>
                    ))}
                </fieldset>
                <div className='container_display'>
                    <h2>PHIM LIÊN QUAN</h2>
                    <CreateDisplayList url='http://127.0.0.1:8000/service/get_thinhhanh/' />
                </div>

                <p>Bình luận</p>
                <div id="binh_luan">
                    <div id="nhap_bl">
                        <i className="fa-solid fa-user"></i>{' '}
                        <textarea placeholder="Thêm bình luận..." />
                    </div>
                </div>
            </div>
            <div className='height_list'> <FilmList url='http://127.0.0.1:8000/service/get_thinhhanh/' /></div>

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