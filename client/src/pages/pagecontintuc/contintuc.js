import React, { useEffect, useState } from "react";
import "./contintuc.scss";

const TTcon = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const id = 12; // Gán cố định ID = 1

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/service/get-html/${id}/`) // Đúng đường dẫn Django mong đợi
      .then((response) => response.text())
      .then((data) => setHtmlContent(data))
      .catch((error) => console.error("Error fetching HTML:", error));
  }, []);

  return (
    <div className="ttcon">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} id="html-file" />
    </div>
  );
};

export default TTcon;
