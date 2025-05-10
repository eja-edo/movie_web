import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * SEO component for managing document head metadata
 *
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Keywords for SEO
 * @param {string} props.ogType - Open Graph type (default: website)
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.ogUrl - Open Graph URL (current page URL)
 * @param {string} props.canonicalUrl - Canonical URL
 * @param {string} props.articlePublishedTime - Article published time (for articles)
 * @param {string} props.articleAuthor - Article author (for articles)
 */
const SEO = ({
  title = 'SMovie - Trang xem phim HD online miễn phí | Phim mới cập nhật hàng ngày',
  description = 'SMovie - Trang web xem phim trực tuyến số 1 Việt Nam với kho phim đa dạng, chất lượng HD, cập nhật phim mới hàng ngày. Phim bộ, phim lẻ, phim chiếu rạp, anime, phim hành động, tình cảm, kinh dị đều có đủ và hoàn toàn miễn phí.',
  keywords = 'xem phim online, phim HD, phim mới, phim bộ, phim lẻ, phim chiếu rạp, phim hành động, phim tình cảm, phim kinh dị, phim Việt Nam, phim Hàn Quốc, phim Trung Quốc, phim Mỹ, anime, hoạt hình',
  ogType = 'website',
  ogImage = `${process.env.REACT_APP_API_URL}/static_sv/assets/img/img_duong/logoweb.png`,
  ogUrl = window.location.href,
  canonicalUrl = window.location.href,
  articlePublishedTime,
  articleAuthor,
}) => {
  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="SMovie" />

      {/* Article specific meta tags */}
      {ogType === 'article' && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {ogType === 'article' && articleAuthor && (
        <meta property="article:author" content={articleAuthor} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Language */}
      <meta property="og:locale" content="vi_VN" />
      <meta name="language" content="Vietnamese" />

      {/* Mobile specific */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#111111" />

      {/* Additional SEO tags */}
      <meta name="revisit-after" content="1 days" />
      <meta name="author" content="SMovie" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
    </Helmet>
  );
};

export default SEO;
