// React component
import React, { useEffect, useState } from "react";
import "./contintuc.scss";
const TTcon = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/service/api/get-html/")
      .then((response) => response.text()) // Đọc file HTML trả về
      .then((data) => setHtmlContent(data)) // Lưu dữ liệu vào state
      .catch((error) => console.error("Error fetching HTML:", error));
  }, []);

  return (
    <div className="ttcon">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} id="html-file" />
    </div>
  );
};

export default TTcon;
