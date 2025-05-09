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
              {genres.map((genre) => {
                const searchParams = new URLSearchParams(); // Tạo query mới
                searchParams.set("genre_id", genre.genre_id); // Thêm genre_id
                return (
                  <li key={`genre-${genre.genre_id}`}>
                    <Link to={`/category/genre?${searchParams.toString()}`}>
                      {genre.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="nav-column">
            <h4>Quốc gia</h4>
            <ul>
              {nations.map((nation) => {
                const searchParams = new URLSearchParams(); // Tạo query mới
                searchParams.set("nation_id", nation.nation_id); // Thêm nation_id
                return (
                  <li key={`nation-${nation.nation_id}`}>
                    <Link to={`/category/nation?${searchParams.toString()}`}>
                      {nation.name}
                    </Link>
                  </li>
                );
              })}
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
