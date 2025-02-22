import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newsScrip.scss";

function NewsScrip() {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/news/get-news/")
      .then((response) => response.json())
      .then((data) => {
        console.log("📌 News fetched:", data);
        setNewsList(data.news);
      })
      .catch((error) => console.error("❌ Error fetching news:", error));
  }, []);

  const handleClick = (id) => {
    navigate(`/ttcon/${id}`); // Điều hướng đến trang TTcon kèm ID
  };

  return (
    <div id="newsScrip">
      <h1 id="namett">Tin tức phim</h1>

      <div id="ListNews">
        {newsList.map((news) => (
          <article
            className="itemNews"
            key={news.id}
            onClick={() => handleClick(news.id)}
          >
            <div className="img">
              <img src={news.image_url} alt={news.title} />
            </div>
            <div>
              <header>
                <h1>{news.title}</h1>
              </header>
              <p>
                {news.content.length > 200
                  ? news.content.slice(0, 200) + "..."
                  : news.content}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default NewsScrip;
