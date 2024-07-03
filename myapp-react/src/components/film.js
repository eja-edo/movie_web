function mota() {
    var div = document.getElementById('thongtin')
    if (div.style.height == '0px') {
        div.style.height = '400px';
        div.style.borderBottom = 'gray 1px solid';
    }

    else {
        div.style.height = '0px';
        div.style.borderBottom = 'none';
    }

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
    a.href = "";
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

    p1.textContent = i;
    p1.style.display = 'none';

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
    if (trans > -1242) {
        var width = document.querySelector('main').clientWidth;
        trans = (Math.floor((trans - width) / 138) + 2) * 138;
        div.style.setProperty('--trans', '' + trans + 'px')
    }

}

for (var i = 0; i < moinhat.length; i++) {
    taoLink(moinhat[i], linkList['link_img'][moinhat[i]], linkList['link_short_video'][moinhat[i]], '' + linkList['year'][moinhat[i]] + ' | ' + linkList['lim'][moinhat[i]] + ' | ' + linkList['country'][moinhat[i]] + ' | ' + linkList['time'][moinhat[i]] + ' | ' + linkList['difinition'][moinhat[i]] + ' ', 'hh');
}

for (var i = 0; i < moinhat.length; i++) {
    // Tạo các phần tử HTML
    let a = document.createElement('a');
    let div1 = document.createElement('div');
    let img = document.createElement('img');
    let video = document.createElement('video');
    let div2 = document.createElement('div');
    let h4 = document.createElement('h4');
    let div3 = document.createElement('div');
    let p0 = document.createElement('p');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');

    // Đặt thuộc tính cho các phần tử
    a.href = 'mtphim.html';
    a.className = 'max_scanner_img';
    img.src = linkList['link_img'][moinhat[i]];
    video.src = linkList['link_short_video'][moinhat[i]];
    video.loop = true;
    video.autoplay = true;
    video.muted = true;
    h4.textContent = linkList['name'][moinhat[i]];
    p0.textContent = moinhat[i];
    p0.style.display = 'none';
    p1.textContent = '' + linkList['lim'][moinhat[i]] + ' ' + linkList['country'][moinhat[i]] + '';
    p2.textContent = '' + linkList['time'][moinhat[i]] + ' | ' + linkList['difinition'][moinhat[i]] + '';

    // Gắn các phần tử con vào phần tử cha
    div3.appendChild(p0);
    div3.appendChild(p1);
    div3.appendChild(p2);
    div2.appendChild(h4);
    div2.appendChild(div3);
    div1.appendChild(img);
    div1.appendChild(video);
    div1.appendChild(div2);
    a.appendChild(div1);

    // Thêm phần tử a vào body (hoặc bất kỳ phần tử cha nào khác)
    document.querySelector('div[id=hh2]').appendChild(a);
}