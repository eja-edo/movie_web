import React from "react";
import "./intro.scss";

function Intro() {
  return (
    <div className="intro-container">
      <div>
        <img
          src={`${process.env.REACT_APP_API_URL}/static/assets/img/img_duong/intro2.png`}
          id="introimg1"
          alt="Phim25 logo with cartoon characters"
        />
        <p>
          Phim25 là một trong những trang web xem phim trực tuyến được xây dựng
          bởi nhóm sinh viên Nguyễn Hải Dương, Vũ Nguyễn Duy Anh, Phạm Ngọc
          Khánh Duy. Với mục tiêu mang đến những phút giây giải trí tuyệt vời,
          Phim25 đảm bảo sẽ là một nơi giải trí hoàn hảo cho mọi người có nhu
          cầu giải trí.
        </p>
        <div id="intro_three">
          <img
            src={`${process.env.REACT_APP_API_URL}/static/assets/img/img_duong/intro3.png`}
            id="introimg2"
          />
          <img
            src={`${process.env.REACT_APP_API_URL}/static/assets/img/img_duong/intro4.png`}
            id="introimg3"
          />
          <img
            src={`${process.env.REACT_APP_API_URL}/static/assets/img/img_duong/intro5.png`}
            id="introimg4"
          />
        </div>
        <p>
          Phim25 sở hữu một thư viện phim khổng lồ với đa dạng thể loại, từ hành
          động, khoa học viễn tưởng, kinh dị, tình cảm cho đến hoạt hình. Đặc
          biệt, trang web liên tục cập nhật các bộ phim mới nhất, bao gồm cả
          phim điện ảnh, phim truyền hình, và show giải trí.
        </p>
        <ul>
          <li>
            Tìm kiếm dễ dàng: Người dùng có thể nhanh chóng tìm kiếm bộ phim
            mình yêu thích thông qua thanh công cụ tiện lợi.
          </li>
          <li>
            Chất lượng hình ảnh cao: Phim25 hỗ trợ nhiều độ phân giải, từ SD đến
            HD, thậm chí có cả Full HD, mang lại trải nghiệm xem phim sắc nét.
          </li>
          <li>
            Tốc độ tải nhanh: Trang web tối ưu tốc độ truyền tải, giảm thiểu
            hiện tượng giật lag khi xem phim.
          </li>
        </ul>
        <p>
          Phim25 là lựa chọn lý tưởng cho những ai muốn tận hưởng không gian
          giải trí tại nhà mà không tốn kém. Với kho phim đồ sộ, chất lượng cao
          và trải nghiệm người dùng mượt mà, trang web này hứa hẹn mang đến cho
          người xem những phút giây thư giãn tuyệt vời cho mọi đối tượng khán
          giả. Nếu bạn là một người yêu phim, đừng bỏ lỡ cơ hội khám phá Phim25!
        </p>
      </div>
    </div>
  );
}

export default Intro;
