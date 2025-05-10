import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * Component to add structured data for website
 */
const WebsiteStructuredData = () => {
  // Create structured data for website
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SMovie",
    "url": "https://smovie.fun",
    "description": "SMovie - Trang web xem phim trực tuyến số 1 Việt Nam với kho phim đa dạng, chất lượng HD, cập nhật phim mới hàng ngày.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://smovie.fun/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://www.facebook.com/smovie",
      "https://twitter.com/smovie",
      "https://www.instagram.com/smovie"
    ]
  };

  // Create organization structured data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SMovie",
    "url": "https://smovie.fun",
    "logo": `${process.env.REACT_APP_API_URL}/static_sv/assets/img/img_duong/logoweb.png`,
    "sameAs": [
      "https://www.facebook.com/smovie",
      "https://twitter.com/smovie",
      "https://www.instagram.com/smovie"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
    </Helmet>
  );
};

export default WebsiteStructuredData;
