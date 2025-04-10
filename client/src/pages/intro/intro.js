import React from "react";
import { useNavigate } from "react-router-dom";
import "./intro.scss";

function Intro() {
  const navigate = useNavigate();

  const handleWatchNow = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <div className="intro-container">
      <div className="intro-content">
        <div className="intro-header">
          <img
            src={`${process.env.REACT_APP_API_URL}/static_sv/assets/img/img_duong/intro2.png`}
            className="intro-logo"
            alt="Smovie logo with cartoon characters"
          />
          <h1 className="intro-title">Chào mừng đến với Smovie</h1>
        </div>

        <div className="intro-section">
          <p className="intro-text">
            Smovie là một trong những trang web xem phim trực tuyến được xây
            dựng bởi nhóm sinh viên Nguyễn Hải Dương, Vũ Nguyễn Duy Anh, Phạm
            Ngọc Khánh Duy. Với mục tiêu mang đến những phút giây giải trí tuyệt
            vời, Smovie đảm bảo sẽ là một nơi giải trí hoàn hảo cho mọi người có
            nhu cầu giải trí.
          </p>
        </div>

        <div className="intro-gallery">
          <img
            src={`${process.env.REACT_APP_API_URL}/static_sv/assets/img/img_duong/intro3.png`}
            className="gallery-img main-img"
            alt="Smovie gallery image 1"
          />
          <img
            src={`${process.env.REACT_APP_API_URL}/static_sv/assets/img/img_duong/intro4.png`}
            className="gallery-img"
            alt="Smovie gallery image 2"
          />
          <img
            src={`${process.env.REACT_APP_API_URL}/static_sv/assets/img/img_duong/intro5.png`}
            className="gallery-img"
            alt="Smovie gallery image 3"
          />
        </div>

        <div className="intro-section">
          <h2 className="section-title">Thư viện phim đa dạng</h2>
          <p className="intro-text">
            Smovie sở hữu một thư viện phim khổng lồ với đa dạng thể loại, từ
            hành động, khoa học viễn tưởng, kinh dị, tình cảm cho đến hoạt hình.
            Đặc biệt, trang web liên tục cập nhật các bộ phim mới nhất, bao gồm
            cả phim điện ảnh, phim truyền hình, và show giải trí.
          </p>
        </div>

        <div className="features-section">
          <h2 className="section-title">Tính năng nổi bật</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="feature-title">Tìm kiếm dễ dàng</h3>
              <p className="feature-text">
                Người dùng có thể nhanh chóng tìm kiếm bộ phim mình yêu thích
                thông qua thanh công cụ tiện lợi.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-film"></i>
              </div>
              <h3 className="feature-title">Chất lượng hình ảnh cao</h3>
              <p className="feature-text">
                Smovie hỗ trợ nhiều độ phân giải, từ SD đến HD, thậm chí có cả
                Full HD, mang lại trải nghiệm xem phim sắc nét.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <h3 className="feature-title">Tốc độ tải nhanh</h3>
              <p className="feature-text">
                Trang web tối ưu tốc độ truyền tải, giảm thiểu hiện tượng giật
                lag khi xem phim.
              </p>
            </div>
          </div>
        </div>

        <div className="intro-section">
          <h2 className="section-title">
            Lựa chọn lý tưởng cho người yêu phim
          </h2>
          <p className="intro-text">
            Smovie là lựa chọn lý tưởng cho những ai muốn tận hưởng không gian
            giải trí tại nhà mà không tốn kém. Với kho phim đồ sộ, chất lượng
            cao và trải nghiệm người dùng mượt mà, trang web này hứa hẹn mang
            đến cho người xem những phút giây thư giãn tuyệt vời cho mọi đối
            tượng khán giả. Nếu bạn là một người yêu phim, đừng bỏ lỡ cơ hội
            khám phá Smovie!
          </p>
        </div>

        <div className="cta-section">
          <h2 className="cta-title">Bắt đầu khám phá ngay hôm nay</h2>
          <button className="cta-button" onClick={handleWatchNow}>
            Xem phim ngay
          </button>
        </div>
      </div>
    </div>
  );
}

export default Intro;
