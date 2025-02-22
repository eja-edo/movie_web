import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Nếu bạn dùng react-router
import "./contintuc.scss";

const TTcon = () => {
  const { folder, file } = useParams(); // Lấy folder và file từ URL
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/service/get-html/`)
      .then((response) => response.text())
      .then((data) => setHtmlContent(data))
      .catch((error) => console.error("Error fetching HTML:", error));
  }, [folder, file]);

  return (
    <div className="ttcon">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} id="html-file" />
    </div>
  );
};

export default TTcon;
