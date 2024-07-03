import logo from './logo.svg';
import '../styles/App.css';


import React, { useState, useRef } from 'react';

// hàm tạo ra một ô trưng bày phim
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
function xemngay(button) {
  var div = button.parentElement;
  var a = div.previousSibling;
  alert((a.textContent));
}

function chitiet(button) {
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

function taoLink(i, img1, video1, content1, name) {
  // Tạo các phần tử
  return (
    <div className={`movie-item ${isHover ? 'hover' : ''}`} id={name}>
      <a
        href="film.html"
        className="img"
        onMouseOver={moLen}
        onMouseOut={tatDi}
      >
        <img src={img1} alt="" />
        <div className="video">
          <video ref={videoRef} src={video1} muted loop onPlay={handleVideoPlay} />
          <div className="control">
            <p style={{ display: 'none' }}>{i}</p>
            <div>
              <a href="film.html" onClick={xemNgay}>
                <div className="play-button">
                  <i className="fa-solid fa-play"></i>
                  Xem ngay
                </div>
              </a>
              <a onClick={plusList}>
                <div className="plus-button">
                  <i className="fa-solid fa-plus"></i>
                  Danh sách
                </div>
              </a>
              <a href="mtphim.html" onClick={chiTiet}>
                <div className="detail-button">
                  <i className="fa-regular fa-lightbulb"></i>
                  Chi tiết
                </div>
              </a>
            </div>
            <p>{content1}</p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default App;