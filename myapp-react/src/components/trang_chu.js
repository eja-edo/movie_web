import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/trang_chu.css';
import reportWebVitals from './reportWebVitals';

// var cr_header = 0;
// function view(li) {

//     if (li.querySelector('div[class="cr"]').style.display === 'none') {
//         li.querySelector('div[class="cr"]').style.display = 'flex';
//         li.querySelector('div[class="cr1"]').style.display = 'flex';
//         cr_header = 1;
//     }
//     else {
//         li.querySelector('div[class="cr"]').style.display = 'none';
//         li.querySelector('div[class="cr1"]').style.display = 'none';
//         cr_header = 0;
//     } console.log(li.querySelector('div[class="cr"]').style.display);
// }

var id_video = 0;
// tạo phương thức duy chuyển sang trái cho phần video quảng cáo phim hot
function nextVideoQc() {
    if (id_video < 4) {
        id_video++;
        document.getElementById('qc_video').style.transform = 'translateX(' + (id_video * -100) + 'vw)';
    }
}
// tạo phương thức duy chuyển sang phải cho phần video quảng cáo phim hot
function backVideoQc() {
    if (id_video > 0) {
        id_video--;
        document.getElementById('qc_video').style.transform = 'translateX(' + (id_video * -100) + 'vw)';
    }
}

// thay đổi mầu của thanh header khi kéo xuống và ngược lại
window.onscroll = () => {
    if (window.scrollY === 0) {
        document.querySelector('header').style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    }
    else {
        document.querySelector('header').style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }
}



var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer mybearertoken"); // Gửi token trong header

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch('http://127.0.0.1:8000/service/get_banner_qc/', requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Chuyển đổi phản hồi thành JSON
    })
    .then(banner_qc => {
        for (var i = 0; i < 5; i++) {
            var div = document.createElement('div');
            div.className = 'if_video';

            var video = document.createElement('video');
            video.src = banner_qc[i]['trailer_url'];
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            div.appendChild(video);

            var divBackground = document.createElement('div');
            divBackground.className = 'bottom_backgroud';
            div.appendChild(divBackground);

            var divInfo = document.createElement('div');
            divInfo.className = 'info';
            div.appendChild(divInfo);

            var h1 = document.createElement('h1');
            h1.textContent = banner_qc[i]['name'];
            divInfo.appendChild(h1);

            var p = document.createElement('p');
            p.textContent = banner_qc[i]['description'];
            divInfo.appendChild(p);

            document.querySelector('div[id=qc_video]').appendChild(div);
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

// tạo ra chuỗi video những phim hot


//thanh điều kiểu trái phải của show_display
var int_show = 0
function show_back(button) {
    if (int_show != 0) {
        var div = button.parentElement.querySelector('div');
        int_show--;
        div.style.transform = 'translateX(-' + int_show * 98 + '%)'
    }
}
function show_next(button) {
    if (int_show < 2) {
        var div = button.parentElement.querySelector('div');
        int_show++;
        div.style.transform = 'translateX(-' + int_show * 98 + '%)'
    }
}
setInterval(() => {
    if (int_show >= 3) {
        int_show = 0
    }
    else {
        var div = document.getElementById('show1').querySelector('div');
        div.style.transform = 'translateX(-' + int_show * 98 + '%)'
        int_show++;
    }
}, 8000)

async function get_display_list(url, id_display) {
    await fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Chuyển đổi phản hồi thành JSON
        })
        .then(data => {
            console.log(data)
            for (var i = 0; i < data.length; i++) {
                taoLink(data[i]['id'], data[i]['poster_url'], data[i]['trailer_url'], '' + data[i]['release_date'] + ' | ' + data[i]['runtime'] + ' | ' + data[i]['rating'] + ' | ' + data[i]['views'] + ' ', id_display);
            }
        }).catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

get_display_list('http://127.0.0.1:8000/service/get_thinhhanh/', 'thinh_hanh')
get_display_list('http://127.0.0.1:8000/service/get_phimhot_10/', 'moi_nhat')
get_display_list('http://127.0.0.1:8000/service/get_phimhh_10/', 'phim_hh')

for (var i = 0; i < moinhat.length; i++) {
    taoLink(moinhat[i], linkList['link_img'][moinhat[i]], linkList['link_short_video'][moinhat[i]], '' + linkList['year'][moinhat[i]] + ' | ' + linkList['lim'][moinhat[i]] + ' | ' + linkList['country'][moinhat[i]] + ' | ' + linkList['time'][moinhat[i]] + ' | ' + linkList['difinition'][moinhat[i]] + ' ', 'dsct');
}
get_display_list('http://127.0.0.1:8000/service/get_phimhanhdong_10/', 'phim_hd')
get_display_list('http://127.0.0.1:8000/service/get_phimkinhdi_10/', 'phim_kd')

for (var i = 0; i < moinhat.length; i++) {
    taoLink(moinhat[i], linkList['link_img'][moinhat[i]], linkList['link_short_video'][moinhat[i]], '' + linkList['year'][moinhat[i]] + ' | ' + linkList['lim'][moinhat[i]] + ' | ' + linkList['country'][moinhat[i]] + ' | ' + linkList['time'][moinhat[i]] + ' | ' + linkList['difinition'][moinhat[i]] + ' ', 'phimle');
}
get_display_list('http://127.0.0.1:8000/service/get_phimtinhcam_10/', 'phim_tinh_cam')


async function submitData() {
    const data = {
        name: 'John Doe',
        email: 'john.doe@example.com',
    };

    try {
        const csrftoken = Cookies.get('csrftoken');

        const response = await fetch('http://127.0.0.1:8000/service/submit_data/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error submitting data:', error);
    }
}
submitData()
reportWebVitals();