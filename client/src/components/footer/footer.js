
import React, { useEffect, useState } from "react";
import "./footer.scss";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"; // Import icons
import { Link } from "react-router-dom";

function FooterComponents() {
  const [genres, setGenres] = useState([]);
  const [nations, setNations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchGenresAndCountries = async () => {
      try {
        // Gọi API để lấy thể loại
        const genresResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/api/core/genres/`
        );
        if (!genresResponse.ok)
          throw new Error(`Lỗi API thể loại: ${genresResponse.status}`);
        const genresData = await genresResponse.json();

        // Gọi API để lấy quốc gia
        const countriesResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/api/core/nations/`
        );
        if (!countriesResponse.ok)
          throw new Error(`Lỗi API quốc gia: ${countriesResponse.status}`);
        const countriesData = await countriesResponse.json();

        // Nếu dữ liệu có dạng { results: [...] }, lấy results
        const genresList = Array.isArray(genresData.results)
          ? genresData.results
          : genresData;
        const countriesList = Array.isArray(countriesData.results)
          ? countriesData.results
          : countriesData;

        // Cập nhật state với 4 mục đầu tiên (nếu có)
        setGenres(Array.isArray(genresList) ? genresList.slice(0, 4) : []);
        setNations(
          Array.isArray(countriesList) ? countriesList.slice(0, 4) : []
        );
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchGenresAndCountries();
  }, []);

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-nav">
          {/* Cột 1: Trang chủ - Hiển thị trên mọi thiết bị */}
          <div className="nav-column">
            <h4>Trang chủ</h4>
            <ul>
              <li>
                <Link to="/">Phim</Link>
              </li>
              <li>
                <Link to="/">Thiết bị</Link>
              </li>
              <li>
                <Link to="/">Giá cả</Link>
              </li>
              <li>
                <Link to="/">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Cột 2: Thể loại - Ẩn trên mobile */}
          <div className="nav-column">
            <h4>Thể loại</h4>
            <ul>
              {genres.length > 0 ? (
                genres.slice(0, 3).map((genre) => {
                  const searchParams = new URLSearchParams();
                  searchParams.set("genre_id", genre.genre_id);
                  return (
                    <li key={`genre-${genre.genre_id}`}>
                      <Link to={`/category/genre?${searchParams.toString()}`}>
                        {genre.name}
                      </Link>
                    </li>
                  );
                })
              ) : (
                <li>Đang tải...</li>
              )}
            </ul>
          </div>

          {/* Cột 3: Quốc gia - Ẩn trên mobile */}
          <div className="nav-column">
            <h4>Quốc gia</h4>
            <ul>
              {nations.length > 0 ? (
                nations.slice(0, 3).map((nation) => {
                  const searchParams = new URLSearchParams();
                  searchParams.set("nation_id", nation.nation_id);
                  return (
                    <li key={`nation-${nation.nation_id}`}>
                      <Link to={`/category/nation?${searchParams.toString()}`}>
                        {nation.name}
                      </Link>
                    </li>
                  );
                })
              ) : (
                <li>Đang tải...</li>
              )}
            </ul>
          </div>

          {/* Cột 4: Giới thiệu - Ẩn trên tablet và mobile */}
          <div className="nav-column">
            <h4>Giới thiệu</h4>
            <ul>
              <li>
                <Link to="/about">Thông tin</Link>
              </li>
              <li>
                <Link to="/about">Về chúng tôi</Link>
              </li>
            </ul>
          </div>

          {/* Cột 5: Hỗ trợ khách hàng - Hiển thị trên mọi thiết bị */}
          <div className="nav-column">
            <h4>Hỗ trợ khách hàng</h4>
            <ul>
              <li>
                <a href="tel:0923012025">Hotline: 0923012025</a>
              </li>
              <li>
                <a href="mailto:smovie@gmail.com">Email: smovie@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Cột 6: Liên lạc - Hiển thị trên mọi thiết bị */}
          <div className="nav-column">
            <h4>Liên lạc</h4>
            <div className="social-links">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Phần cuối footer - Đơn giản hóa trên mobile */}
      <div className="ft-cuoi">
        <div className="footer-bottom">
          <p>© 2025 Nhóm7D17CNPM4</p>
          <div className="footer-links">
            <Link to="/terms">Điều khoản sử dụng</Link>
            <Link to="/privacy">Chính sách bảo mật</Link>
            <Link to="/cookies">Chính sách Cookie</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponents;

