import React, { useState, useEffect } from "react";
import "./timkiem.scss";
import CreateDisplayList from "../../components/CreateDisplayList/CreateDisplayList";
import LazyLoad from "react-lazyload";
import movieAPI from "../../services/movieAPI";
import ShowDisplay from "../../components/showdisplay/showdisplay";
function Timkiem() {
  const [myList, setMylist] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [myListData] = await Promise.all([
          movieAPI.getDisplayList(`${process.env.REACT_APP_API_URL}/movies/get_thinhhanh/`),
        ]);
        setMylist(myListData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="timkiempage">
      <div className=".show-display-container">
        <ShowDisplay />
      </div>

      <div className="no-results">
        <h2>
          Không có kết quả nào để hiển thị với:{" "}
          <span className="keyword">phimabc</span>
        </h2>
        <p>Gợi ý:</p>
        <ul>
          <li id="tk1">Hãy chắc chắn rằng tất cả các từ đều đúng chính tả.</li>
          <li id="tk1">Hãy thử các từ khóa khác nhau.</li>
          <li id="tk1">Thử những từ khóa thông thường hơn.</li>
          <li id="tk1">Bạn có thể thử một số loại phim khác.</li>
        </ul>
      </div>
      <div id="gthieu"></div>
      <a
        href="#"
        className="xemthem"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <h2>DANH SÁCH CỦA TÔI</h2>
      </a>
      <LazyLoad height={200} offset={100}>
        {myList ? <CreateDisplayList films={myList} /> : <></>}
      </LazyLoad>
    </div>
  );
}

export default Timkiem;
