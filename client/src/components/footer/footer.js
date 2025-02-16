import React from "react";
import "./footer.scss";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"; // Import icons

function FooterComponents() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-nav">
          <div className="nav-column">
            <h4>Trang chủ</h4>
            <ul>
              <li>Phim</li>
              <li>Devices</li>
              <li>Pricing</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div className="nav-column">
            <h4>Thể loại</h4>
            <ul>
              <li>Phim tình cảm</li>
              <li>Phim hoạt hình</li>
              <li>Phim tâm lý</li>
              <li>Phim khoa học</li>
            </ul>
          </div>
          <div className="nav-column">
            <h4>Quốc gia</h4>
            <ul>
              <li>Việt Nam</li>
              <li>Hàn Quốc</li>
              <li>Mỹ</li>
              <li>Nhật</li>
            </ul>
          </div>
          <div className="nav-column">
            <h4>Giới thiệu</h4>
            <ul>
              <li>Thông tin</li>
            </ul>
          </div>
          <div className="nav-column">
            <h4>Hỗ trợ khách hàng</h4>
            <ul>
              <li>Hotline: 0923012025</li>
              <li>Email: smovie@gmail.com</li>
            </ul>
          </div>
          <div className="nav-column">
            <h4>Liên lạc</h4>
            <div className="social-links">
              <a href="#" className="social-icon">
                <FaFacebook />
              </a>
              <a href="#" className="social-icon">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="ft-cuoi">
        <div className="footer-bottom">
          <p>@2025.Nhóm7D17CNPM4</p>
          <div className="footer-links">
            <a href="#">Điều khoản sử dụng</a>
            <a href="#">Chính sách bảo mật</a>
            <a href="#">Chính sách Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponents;
