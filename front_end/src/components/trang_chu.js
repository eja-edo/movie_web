// mở thông tin tạm của phim khi con trỏ đi qua hình ảnh bằng cách thay đổi giá trị chiều cao từ 0 ( trạng thái tát) sang 258px
function molen(element) {
    var div = element.querySelector('div');
    div.style.height = '258px';
    var video = div.querySelector('video');
    video.play();
    var div_parent = element.parentNode;
    var index = Array.prototype.indexOf.call(div_parent.children, element)
    var trans = +getComputedStyle(div).getPropertyValue('--trans').replace('px', '');
    if ((-trans / 138) === index)
        element.querySelector('div').style.transform = 'translateX(120px)'
}
//đóng video khi co trỏ ra khỏi hình ảnh
function tatdi(element) {
    var div = element.querySelector('div');
    div.style.height = '0px';
    div.querySelector('video').pause();
}
function xem_ngay(button) {
    var div = button.parentElement;
    var a = div.previousSibling;
    alert((a.textContent));
}

function chi_tiet(button) {
    var div = button.parentElement;
    var a = div.previousSibling;
    alert((a.textContent));
}

function back(button) {
    div = button.parentElement.querySelector('div[class=display_list]');
    var trans = +getComputedStyle(div).getPropertyValue('--trans').replace('px', '');
    if (trans != 0) {
        var width = document.documentElement.clientWidth;
        if (-trans <= width) {
            div.style.setProperty('--trans', '0px')
        }

        else {
            trans = trans + width;
            div.style.setProperty('--trans', '' + trans + 'px')
        }
    }
}
function next(button) {
    div = button.parentElement.querySelector('div[class=display_list]');
    var trans = +getComputedStyle(div).getPropertyValue('--trans').replace('px', '');
    var width = document.documentElement.clientWidth;
    trans = (Math.floor((trans - width) / 138) + 2) * 138;
    if (trans > -1656) {
        div.style.setProperty('--trans', '' + trans + 'px')
    }

}

var cr_header = 0;
function view(li) {

    if (li.querySelector('div[class="cr"]').style.display === 'none') {
        li.querySelector('div[class="cr"]').style.display = 'flex';
        li.querySelector('div[class="cr1"]').style.display = 'flex';
        cr_header = 1;
    }
    else {
        li.querySelector('div[class="cr"]').style.display = 'none';
        li.querySelector('div[class="cr1"]').style.display = 'none';
        cr_header = 0;
    } console.log(li.querySelector('div[class="cr"]').style.display);
}
// hàm tạo ra một ô trưng bày phim
function taoLink(i, img1, video1, content1, name) {
    // Tạo các phần tử
    var a = document.createElement('a');
    var img = document.createElement('img');
    var divVideo = document.createElement('div');
    var video = document.createElement('video');
    var divControl = document.createElement('div');
    var p1 = document.createElement('p');
    var div0 = document.createElement('div');
    var button1 = document.createElement('a');
    button1.onclick = function () { xem_ngay(this); }
    var div_a1 = document.createElement('div');
    var button2 = document.createElement('a');
    button2.onclick = function () { plus_list(this); }
    var button3 = document.createElement('a');
    button3.onclick = function () { chi_tiet(this); }
    var p = document.createElement('p');

    // Thiết lập thuộc tính cho các phần tử
    a.href = "film.html";
    a.className = "img";
    a.onmouseout = function () { tatdi(this); };
    a.onmouseover = function () { molen(this); };

    img.src = img1;
    img.alt = "";
    button1.href = 'film.html';
    button3.href = 'mtphim.html';

    divVideo.className = "video";

    video.src = video1;
    video.muted = true;
    video.loop = true;

    divControl.className = "control";
    p1.style.display = 'none';
    p1.textContent = i;
    // p1.style.display='none'

    div_a1.innerHTML = '<i class="fa-solid fa-play"></i>Xem ngay';
    div_a1.style.backgroundColor = '#fff';
    div_a1.style.color = '#111';
    button1.appendChild(div_a1);
    button2.innerHTML = '<div><i class="fa-solid fa-plus"></i>Danh sách</div>';
    button3.innerHTML = '<div><i class="fa-regular fa-lightbulb"></i>Chi tiết</div>';

    p.textContent = content1;

    // Thêm các phần tử vào cây DOM
    divControl.appendChild(p1);
    div0.appendChild(button1);
    div0.appendChild(button2);
    div0.appendChild(button3);
    divControl.appendChild(div0)
    divControl.appendChild(p);

    divVideo.appendChild(video);
    divVideo.appendChild(divControl);

    a.appendChild(img);
    a.appendChild(divVideo);

    // Thêm phần tử 'a' vào body (hoặc bất kỳ phần tử cha nào bạn muốn)
    document.querySelector('div[id=' + name + '] div').appendChild(a);
}

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

// tạo ra chuỗi video những phim hot
for (var i = 0; i < 5; i++) {
    var div = document.createElement('div');
    div.className = 'if_video';

    var video = document.createElement('video');
    video.src = linkList['link_short_video'][i];
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
    h1.textContent = linkList['name'][i];
    divInfo.appendChild(h1);

    var p = document.createElement('p');
    p.textContent = linkList['discribe'][i];
    divInfo.appendChild(p);

    document.querySelector('div[id=qc_video]').appendChild(div);
}

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





for (var i = 0; i < thinhhanh.length; i++) {
    taoLink(thinhhanh[i], linkList['link_img'][thinhhanh[i]], linkList['link_short_video'][thinhhanh[i]], '' + linkList['year'][thinhhanh[i]] + ' | ' + linkList['lim'][thinhhanh[i]] + ' | ' + linkList['country'][thinhhanh[i]] + ' | ' + linkList['time'][thinhhanh[i]] + ' | ' + linkList['difinition'][thinhhanh[i]] + ' ', 'thinh_hanh');
}
for (var i = 0; i < moinhat.length; i++) {
    taoLink(moinhat[i], linkList['link_img'][moinhat[i]], linkList['link_short_video'][moinhat[i]], '' + linkList['year'][moinhat[i]] + ' | ' + linkList['lim'][moinhat[i]] + ' | ' + linkList['country'][moinhat[i]] + ' | ' + linkList['time'][moinhat[i]] + ' | ' + linkList['difinition'][moinhat[i]] + ' ', 'moi_nhat');
}
for (var i = 0; i < moinhat.length; i++) {
    taoLink(moinhat[i], linkList['link_img'][moinhat[i]], linkList['link_short_video'][moinhat[i]], '' + linkList['year'][moinhat[i]] + ' | ' + linkList['lim'][moinhat[i]] + ' | ' + linkList['country'][moinhat[i]] + ' | ' + linkList['time'][moinhat[i]] + ' | ' + linkList['difinition'][moinhat[i]] + ' ', 'phim_hh');
}
for (var i = 0; i < moinhat.length; i++) {
    taoLink(moinhat[i], linkList['link_img'][moinhat[i]], linkList['link_short_video'][moinhat[i]], '' + linkList['year'][moinhat[i]] + ' | ' + linkList['lim'][moinhat[i]] + ' | ' + linkList['country'][moinhat[i]] + ' | ' + linkList['time'][moinhat[i]] + ' | ' + linkList['difinition'][moinhat[i]] + ' ', 'dsct');
}
for (var i = 0; i < moinhat.length; i++) {
    taoLink(moinhat[i], linkList['link_img'][moinhat[i]], linkList['link_short_video'][moinhat[i]], '' + linkList['year'][moinhat[i]] + ' | ' + linkList['lim'][moinhat[i]] + ' | ' + linkList['country'][moinhat[i]] + ' | ' + linkList['time'][moinhat[i]] + ' | ' + linkList['difinition'][moinhat[i]] + ' ', 'phim_dien_anh');
}
for (var i = 0; i < moinhat.length; i++) {
    taoLink(moinhat[i], linkList['link_img'][moinhat[i]], linkList['link_short_video'][moinhat[i]], '' + linkList['year'][moinhat[i]] + ' | ' + linkList['lim'][moinhat[i]] + ' | ' + linkList['country'][moinhat[i]] + ' | ' + linkList['time'][moinhat[i]] + ' | ' + linkList['difinition'][moinhat[i]] + ' ', 'phim_kd');
}
for (var i = 0; i < moinhat.length; i++) {
    taoLink(moinhat[i], linkList['link_img'][moinhat[i]], linkList['link_short_video'][moinhat[i]], '' + linkList['year'][moinhat[i]] + ' | ' + linkList['lim'][moinhat[i]] + ' | ' + linkList['country'][moinhat[i]] + ' | ' + linkList['time'][moinhat[i]] + ' | ' + linkList['difinition'][moinhat[i]] + ' ', 'phimle');
}
for (var i = 0; i < moinhat.length; i++) {
    taoLink(moinhat[i], linkList['link_img'][moinhat[i]], linkList['link_short_video'][moinhat[i]], '' + linkList['year'][moinhat[i]] + ' | ' + linkList['lim'][moinhat[i]] + ' | ' + linkList['country'][moinhat[i]] + ' | ' + linkList['time'][moinhat[i]] + ' | ' + linkList['difinition'][moinhat[i]] + ' ', 'phim_hanh_dong');
}