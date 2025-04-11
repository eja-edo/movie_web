import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./contintuc.scss";
import NewsScrip from "../news/newsScrip";

const TTcon = () => {
  const { id } = useParams(); // Lấy id từ URL

  console.log("🔍 ID từ URL:", id);

  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    // Sử dụng biến môi trường thay vì URL cố định
    const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

    fetch(`${apiUrl}/api/news/get-html/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        console.log("📄 HTML content:", data.substring(0, 500) + "..."); // Log 500 ký tự đầu tiên

        // Xử lý đường dẫn ảnh trong nội dung HTML
        let processedHtml = data;

        // Xử lý các đường dẫn ảnh tương đối
        processedHtml = processedHtml.replace(
          /src="(?!http|https)([^"]+)"/g,
          (match, path) => {
            const newPath = path.startsWith("/")
              ? `${apiUrl}${path}`
              : `${apiUrl}/${path}`;
            console.log(`🖼️ Updating image src: ${path} -> ${newPath}`);
            return `src="${newPath}"`;
          }
        );

        // Xử lý các đường dẫn ảnh trong style
        processedHtml = processedHtml.replace(
          /url\(['"]?(?!http|https)([^'"()]+)['"]?\)/g,
          (match, path) => {
            const newPath = path.startsWith("/")
              ? `${apiUrl}${path}`
              : `${apiUrl}/${path}`;
            console.log(`🖼️ Updating image url: ${path} -> ${newPath}`);
            return `url("${newPath}")`;
          }
        );

        console.log(
          "🖼️ Processed HTML:",
          processedHtml.substring(0, 500) + "..."
        );

        setHtmlContent(processedHtml);
      })
      .catch((error) => {
        console.error("Error fetching HTML:", error);
        setHtmlContent("<p>Không thể tải nội dung. Vui lòng thử lại sau.</p>");
      });
  }, [id]);

  return (
    <div className="ttcon">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} id="html-file" />
    </div>
  );
};

export default TTcon;
