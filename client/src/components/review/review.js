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
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
    currentPage: 1,
    pageSize: 5,
  });
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (movie_id) {
      fetchReviews();
    }
  }, [movie_id, pagination.currentPage]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/movies/${movie_id}/reviews/?page=${pagination.currentPage}&page_size=${pagination.pageSize}`
      );
      if (!response.ok) throw new Error("Failed to fetch reviews");
      const data = await response.json();
      setReviews(data.results);
      setPagination((prev) => ({
        ...prev,
        count: data.count,
        next: data.next,
        previous: data.previous,
      }));
    } catch (error) {
      setError(error.message);
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setShowLoginPrompt(true);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/movies/${movie_id}/reviews/add/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ rating, comment }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setShowLoginPrompt(true);
          return;
        }
        throw new Error("Failed to add review");
      }

      await response.json();

      setPagination((prev) => ({ ...prev, currentPage: 1 }));
      await fetchReviews();
      setRating(0);
      setComment("");
      setHover(0);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = () => navigate("/login");

  if (loading) return <div className="review-section">Loading reviews...</div>;
  if (error) return <div className="review-section">Error: {error}</div>;

  return (
    <div className="review-section">
      <h2>Đánh giá phim</h2>

      {/* FORM đánh giá của bạn */}
      <form onSubmit={handleSubmit} className="review-form">
        <div className="rating-input">
          <label>Đánh giá của bạn:</label>
          <div className="stars">
            {[...Array(5)].map((_, index) => {
              const starIndex = index + 1;
              return (
                <button
                  type="button"
                  key={starIndex}
                  className={
                    starIndex <= (hover || rating) ? "star filled" : "star"
                  }
                  onClick={() => setRating(starIndex)}
                  onMouseEnter={() => setHover(starIndex)}
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

      {/* DANH SÁCH các đánh giá */}
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.review_id} className="review-item">
            <div className="review-header">
              <span className="username">{review.username}</span>
              <div className="rating">
                {[...Array(5)].map((_, index) => (
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

      {/* PHÂN TRANG */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={!pagination.previous}
        >
          ◀
        </button>
        <span>
          {pagination.currentPage} /{" "}
          {Math.ceil(pagination.count / pagination.pageSize)}
        </span>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={!pagination.next}
        >
          ▶
        </button>
      </div>

      {/* MODAL yêu cầu đăng nhập */}
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
