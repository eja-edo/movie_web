import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newsScrip.scss";
import SEO from "../../components/SEO/SEO";

function NewsScrip() {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/news/get-news/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("📌 News fetched:", data);
        setNewsList(data.news);
      })
      .catch((error) => console.error("❌ Error fetching news:", error));
  }, []);

  const handleClick = (id) => {
    navigate(`/ttcon/${id}`); // Điều hướng đến trang TTcon kèm ID
  };

  // Hàm xử lý URL ảnh
  const getImageUrl = (imageUrl) => {
    // Sử dụng biến môi trường thay vì URL cố định
    const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

    if (!imageUrl || imageUrl.trim() === "") {
      console.log("🚫 Empty image URL, using placeholder");
      return "/placeholder-image.jpg";
    }

    // Nếu URL đã bắt đầu bằng http hoặc https, trả về nguyên
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      console.log("✅ Using absolute URL:", imageUrl);
      return imageUrl;
    }

    // Nếu URL bắt đầu bằng /, thêm domain
    if (imageUrl.startsWith("/")) {
      const fullUrl = `${apiUrl}${imageUrl}`;
      console.log(`🔄 Converting relative URL: ${imageUrl} -> ${fullUrl}`);
      return fullUrl;
    }

    // Trường hợp còn lại, thêm domain và /
    const fullUrl = `${apiUrl}/${imageUrl}`;
    console.log(`🔄 Converting relative URL: ${imageUrl} -> ${fullUrl}`);
    return fullUrl;
  };

  // Điều chỉnh độ dài nội dung dựa trên kích thước màn hình
  const getContentPreview = (content) => {
    // Kiểm tra kích thước màn hình
    const isMobile = window.innerWidth <= 480;
    const isSmallMobile = window.innerWidth <= 360;

    // Điều chỉnh độ dài nội dung
    const maxLength = isSmallMobile ? 120 : isMobile ? 150 : 200;

    return content.length > maxLength
      ? content.slice(0, maxLength) + "..."
      : content;
  };

  // SEO data for news page
  const newsSeoData = {
    title: 'Tin tức phim mới nhất, review phim hay, thông tin điện ảnh | SMovie',
    description: 'Cập nhật tin tức phim mới nhất, review phim hay, thông tin về các bộ phim sắp ra mắt, phỏng vấn diễn viên và đạo diễn nổi tiếng. Khám phá thế giới điện ảnh cùng SMovie.',
    keywords: 'tin tức phim, phim mới, review phim, đánh giá phim, diễn viên nổi tiếng, đạo diễn, giải trí, điện ảnh, phim sắp chiếu, phim rạp, phim bộ, phim lẻ, phim Việt Nam, phim Hàn Quốc, phim Hollywood',
    ogType: 'website',
    ogImage: `${process.env.REACT_APP_API_URL}/static_sv/assets/img/img_duong/logoweb.png`,
    ogUrl: 'https://smovie.fun/newsScrip',
    canonicalUrl: 'https://smovie.fun/newsScrip',
  };

  return (
    <div id="newsScrip">
      {/* Add SEO component */}
      <SEO {...newsSeoData} />

      <h1 id="namett">Tin tức phim</h1>

      <div id="ListNews">
        {newsList.length === 0 ? (
          <div className="loading-message">Đang tải tin tức...</div>
        ) : (
          newsList.map((news) => (
            <article
              className="itemNews"
              key={news.id}
              onClick={() => handleClick(news.id)}
            >
              <div className="img">
                <img
                  src={getImageUrl(news.image_url)}
                  alt={news.title}
                  onError={(e) => {
                    console.error("❌ Error loading image:", news.image_url);
                    // Thử tải lại với đường dẫn tuyệt đối
                    if (!e.target.src.includes("/placeholder-image.jpg")) {
                      console.log("🔄 Trying placeholder image");
                      e.target.src = "/placeholder-image.jpg";
                    }
                  }}
                  loading="lazy"
                />
              </div>
              <div>
                <header>
                  <h1>{news.title}</h1>
                </header>
                <p>{getContentPreview(news.content)}</p>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export default NewsScrip;
