

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

function xem(a) {

    div = a.nextElementSibling;
    if (getComputedStyle(div).display == 'flex')
        div.style.display = 'none';
    else {
        div.style.display = 'flex'
    }
}

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
    document.querySelector('div[id=' + name + ']').appendChild(a);
}
for (var i = 0; i < thinhhanh.length; i++) {
    taoLink(thinhhanh[i], linkList['link_img'][thinhhanh[i]], linkList['link_short_video'][thinhhanh[i]], '' + linkList['year'][thinhhanh[i]] + ' | ' + linkList['lim'][thinhhanh[i]] + ' | ' + linkList['country'][thinhhanh[i]] + ' | ' + linkList['time'][thinhhanh[i]] + ' | ' + linkList['difinition'][thinhhanh[i]] + ' ', 'dathem');
}
for (var i = 0; i < thinhhanh.length; i++) {
    taoLink(thinhhanh[i], linkList['link_img'][thinhhanh[i]], linkList['link_short_video'][thinhhanh[i]], '' + linkList['year'][thinhhanh[i]] + ' | ' + linkList['lim'][thinhhanh[i]] + ' | ' + linkList['country'][thinhhanh[i]] + ' | ' + linkList['time'][thinhhanh[i]] + ' | ' + linkList['difinition'][thinhhanh[i]] + ' ', 'yeuthich');
}
for (var i = 0; i < thinhhanh.length; i++) {
    taoLink(thinhhanh[i], linkList['link_img'][thinhhanh[i]], linkList['link_short_video'][thinhhanh[i]], '' + linkList['year'][thinhhanh[i]] + ' | ' + linkList['lim'][thinhhanh[i]] + ' | ' + linkList['country'][thinhhanh[i]] + ' | ' + linkList['time'][thinhhanh[i]] + ' | ' + linkList['difinition'][thinhhanh[i]] + ' ', 'daxem');
}