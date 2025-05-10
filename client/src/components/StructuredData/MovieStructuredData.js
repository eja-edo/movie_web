import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * Component to add structured data for movies
 * 
 * @param {Object} props
 * @param {Object} props.movie - Movie data
 */
const MovieStructuredData = ({ movie }) => {
  if (!movie) return null;

  // Format release date if available
  const releaseDate = movie.release_date ? 
    new Date(movie.release_date).toISOString().split('T')[0] : 
    undefined;

  // Create structured data for movie
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": movie.title,
    "description": movie.description,
    "image": `${process.env.REACT_APP_API_URL}${movie.poster_url?.replace(/\\/g, "/")}`,
    "url": `https://smovie.fun/detail/${movie.movie_id}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": movie.rating || "4.5",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": movie.views || "100"
    }
  };

  // Add release date if available
  if (releaseDate) {
    structuredData.datePublished = releaseDate;
  }

  // Add duration if available
  if (movie.runtime) {
    structuredData.duration = `PT${movie.runtime}M`;
  }

  // Add actors if available
  if (movie.actors && movie.actors.length > 0) {
    structuredData.actor = movie.actors.map(actor => ({
      "@type": "Person",
      "name": actor.name
    }));
  }

  // Add directors if available
  if (movie.directors && movie.directors.length > 0) {
    structuredData.director = movie.directors.map(director => ({
      "@type": "Person",
      "name": director.name
    }));
  }

  // Add genres if available
  if (movie.genres && movie.genres.length > 0) {
    structuredData.genre = movie.genres.map(genre => genre.name);
  }

  // Add country of origin if available
  if (movie.nation && movie.nation.name) {
    structuredData.countryOfOrigin = {
      "@type": "Country",
      "name": movie.nation.name
    };
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default MovieStructuredData;
