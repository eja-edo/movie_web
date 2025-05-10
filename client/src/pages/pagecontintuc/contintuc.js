import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./contintuc.scss";
import NewsScrip from "../news/newsScrip";
import SEO from "../../components/SEO/SEO";
import ArticleStructuredData from "../../components/StructuredData/ArticleStructuredData";

const TTcon = () => {
  const { id } = useParams(); // Lấy id từ URL

  console.log("🔍 ID từ URL:", id);

  const [htmlContent, setHtmlContent] = useState("");
  const [newsTitle, setNewsTitle] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [newsImage, setNewsImage] = useState("");

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

        // Xử lý các đường dẫn ảnh trong thẻ img
        processedHtml = processedHtml.replace(
          /<img[^>]+src="((?!http|https|\/\/|data:)[^"]+)"([^>]*)>/gi,
          (match, path, rest) => {
            // Xử lý đặc biệt cho smovie.com
            if (path.includes("smovie.com")) {
              const pathParts = path.split("smovie.com");
              const relativePath = pathParts[pathParts.length - 1];
              const newPath = `${apiUrl}${relativePath}`;
              console.log(`🖼️ Fixing smovie.com path: ${path} -> ${newPath}`);
              return `<img src="${newPath}"${rest} onerror="this.onerror=null; this.src='/placeholder-image.jpg';">`;
            }

            const newPath = path.startsWith("/")
              ? `${apiUrl}${path}`
              : `${apiUrl}/${path}`;
            console.log(`🖼️ Updating image src: ${path} -> ${newPath}`);
            return `<img src="${newPath}"${rest} onerror="this.onerror=null; this.src='/placeholder-image.jpg';">`;
          }
        );

        // Xử lý các đường dẫn ảnh tương đối trong thuộc tính src
        processedHtml = processedHtml.replace(
          /src="(?!http|https|\/\/|data:)([^"]+)"/gi,
          (match, path) => {
            // Xử lý đặc biệt cho smovie.com
            if (path.includes("smovie.com")) {
              const pathParts = path.split("smovie.com");
              const relativePath = pathParts[pathParts.length - 1];
              const newPath = `${apiUrl}${relativePath}`;
              console.log(`🖼️ Fixing smovie.com path: ${path} -> ${newPath}`);
              return `src="${newPath}"`;
            }

            const newPath = path.startsWith("/")
              ? `${apiUrl}${path}`
              : `${apiUrl}/${path}`;
            console.log(`🖼️ Updating image src: ${path} -> ${newPath}`);
            return `src="${newPath}"`;
          }
        );

        // Xử lý các đường dẫn ảnh trong style
        processedHtml = processedHtml.replace(
          /url\(['"]?(?!http|https|\/\/|data:)([^'"()]+)['"]?\)/gi,
          (match, path) => {
            // Xử lý đặc biệt cho smovie.com
            if (path.includes("smovie.com")) {
              const pathParts = path.split("smovie.com");
              const relativePath = pathParts[pathParts.length - 1];
              const newPath = `${apiUrl}${relativePath}`;
              console.log(
                `🖼️ Fixing smovie.com path in CSS: ${path} -> ${newPath}`
              );
              return `url("${newPath}")`;
            }

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

        // Extract title, description and image for SEO
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = processedHtml;

        // Extract title from h1 or h2
        const titleElement = tempDiv.querySelector('h1') || tempDiv.querySelector('h2');
        if (titleElement) {
          setNewsTitle(titleElement.textContent);
        }

        // Extract description from first paragraph
        const paragraphs = tempDiv.querySelectorAll('p');
        if (paragraphs.length > 0) {
          setNewsDescription(paragraphs[0].textContent);
        }

        // Extract first image for og:image
        const images = tempDiv.querySelectorAll('img');
        if (images.length > 0) {
          setNewsImage(images[0].src);
        }

        setHtmlContent(processedHtml);
      })
      .catch((error) => {
        console.error("Error fetching HTML:", error);
        setHtmlContent("<p>Không thể tải nội dung. Vui lòng thử lại sau.</p>");
      });
  }, [id]);

  // Prepare SEO data
  const seoData = {
    title: newsTitle ? `${newsTitle} | Tin Tức Điện Ảnh SMovie` : 'Tin tức phim mới nhất, review phim hay | SMovie',
    description: newsDescription ?
      `${newsDescription.substring(0, 150)}... | Đọc tin tức điện ảnh mới nhất tại SMovie` :
      'Cập nhật tin tức phim mới nhất, review phim hay, thông tin về các bộ phim sắp ra mắt, phỏng vấn diễn viên và đạo diễn nổi tiếng. Khám phá thế giới điện ảnh cùng SMovie.',
    keywords: 'tin tức phim, phim mới, review phim, đánh giá phim, diễn viên nổi tiếng, đạo diễn, giải trí, điện ảnh, phim sắp chiếu, phim rạp, phim bộ, phim lẻ, phim Việt Nam, phim Hàn Quốc, phim Hollywood',
    ogType: 'article',
    ogImage: newsImage || `${process.env.REACT_APP_API_URL}/static_sv/assets/img/img_duong/logoweb.png`,
    ogUrl: `https://smovie.fun/ttcon/${id}`,
    canonicalUrl: `https://smovie.fun/ttcon/${id}`,
    // Thêm thông tin bài viết cho schema Article
    articlePublishedTime: new Date().toISOString(), // Nếu có thời gian xuất bản thực tế, hãy sử dụng
    articleAuthor: 'SMovie',
  };

  return (
    <div className="ttcon">
      {/* Add SEO component with news-specific data */}
      <SEO {...seoData} />

      {/* Add structured data for article */}
      <ArticleStructuredData
        title={newsTitle || 'Tin tức phim mới nhất'}
        description={newsDescription || 'Cập nhật tin tức phim mới nhất tại SMovie'}
        imageUrl={newsImage || `${process.env.REACT_APP_API_URL}/static_sv/assets/img/img_duong/logoweb.png`}
        url={`https://smovie.fun/ttcon/${id}`}
      />

      <div dangerouslySetInnerHTML={{ __html: htmlContent }} id="html-file" />
    </div>
  );
};

export default TTcon;
