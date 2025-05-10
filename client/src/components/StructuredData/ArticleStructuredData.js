import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * Component to add structured data for news articles
 * 
 * @param {Object} props
 * @param {string} props.title - Article title
 * @param {string} props.description - Article description
 * @param {string} props.imageUrl - Article image URL
 * @param {string} props.url - Article URL
 * @param {string} props.publishedDate - Article published date
 * @param {string} props.author - Article author
 */
const ArticleStructuredData = ({ 
  title, 
  description, 
  imageUrl, 
  url, 
  publishedDate = new Date().toISOString(),
  author = 'SMovie'
}) => {
  // Create structured data for article
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": title,
    "description": description,
    "image": imageUrl,
    "url": url,
    "datePublished": publishedDate,
    "dateModified": publishedDate,
    "author": {
      "@type": "Organization",
      "name": author,
      "url": "https://smovie.fun"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SMovie",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.REACT_APP_API_URL}/static_sv/assets/img/img_duong/logoweb.png`,
        "width": 600,
        "height": 60
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default ArticleStructuredData;
