import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./contintuc.scss";
import NewsScrip from "../news/newsScrip";
const TTcon = () => {
  const { id } = useParams(); // Lấy id từ URL

  console.log("🔍 ID từ URL:", id);

  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {

    fetch(`${process.env.REACT_APP_API_URL}/service/get-html/${id}/`)

      .then((response) => response.text())
      .then((data) => setHtmlContent(data))
      .catch((error) => console.error("Error fetching HTML:", error));
  }, [id]);

  return (
    <div className="ttcon">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} id="html-file" />
    </div>
  );
};

export default TTcon;
