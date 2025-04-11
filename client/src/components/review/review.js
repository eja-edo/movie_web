import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./review.scss";

const Review = ({ movie_id }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (movie_id) {
      fetchReviews();
    }
  }, [movie_id]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/movies/${movie_id}/reviews/`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setShowLoginPrompt(true);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/movies/${movie_id}/reviews/add/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating,
            comment,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setShowLoginPrompt(true);
          return;
        }
        throw new Error("Failed to add review");
      }

      const newReview = await response.json();
      setReviews([newReview, ...reviews]);
      setRating(0);
      setComment("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  if (loading) return <div className="review-section">Loading reviews...</div>;
  if (error) return <div className="review-section">Error: {error}</div>;

  return (
    <div className="review-section">
      <h2>Đánh giá phim</h2>
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.review_id} className="review-item">
            <div className="review-header">
              <span className="username">{review.username}</span>
              <div className="rating">
                {[...Array(5)].map((star, index) => (
                  <span
                    key={index}
                    className={index < review.rating ? "star filled" : "star"}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="comment">{review.comment}</p>
            <span className="date">
              {new Date(review.create_at).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="review-form">
        <div className="rating-input">
          <label>Đánh giá của bạn:</label>
          <div className="stars">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={
                    index <= (hover || rating) ? "star filled" : "star"
                  }
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  ★
                </button>
              );
            })}
          </div>
        </div>
        <div className="comment-input">
          <label htmlFor="comment">Bình luận:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Gửi đánh giá
        </button>
      </form>

      {showLoginPrompt && (
        <div className="login-prompt-modal">
          <div className="modal-content">
            <h3>Vui lòng đăng nhập</h3>
            <p>Bạn cần đăng nhập để có thể đánh giá phim.</p>
            <div className="modal-buttons">
              <button
                className="cancel-button"
                onClick={() => setShowLoginPrompt(false)}
              >
                Hủy
              </button>
              <button className="login-button" onClick={handleLogin}>
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
