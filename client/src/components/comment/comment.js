import React, { useState, useEffect } from "react";
import "./comment.scss";

const Comment = ({ episode_id }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ws, setWs] = useState(null);
  const [wsConnected, setWsConnected] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Token available:", !!token);
    setIsLoggedIn(!!token);
  }, []);

  // Fetch initial comments when component mounts or episode_id changes
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        console.log("Fetching comments for episode:", episode_id);
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/comments/${episode_id}/`
        );
        if (!response.ok) {
          console.error(
            "Failed to fetch comments:",
            response.status,
            response.statusText
          );
          setError("Không thể tải bình luận");
          return;
        }
        const data = await response.json();
        console.log("Comments data received:", data);
        setComments(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("Lỗi khi tải bình luận");
      } finally {
        setLoading(false);
      }
    };

    if (episode_id) {
      fetchComments();
    } else {
      setLoading(false);
    }
  }, [episode_id]);

  // WebSocket connection for real-time comments
  useEffect(() => {
    if (!episode_id) return;

    // Get the API URL and extract the host and port
    const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
    const wsUrl = apiUrl.replace("http", "ws");

    const token = localStorage.getItem("accessToken");

    console.log("API URL:", process.env.REACT_APP_API_URL);
    console.log(
      "WebSocket URL:",
      `${wsUrl}/ws/comments/${episode_id}/?token=${token}`
    );
    console.log("Token for WebSocket:", token);

    // Only connect to WebSocket if user is logged in
    if (token) {
      try {
        const websocket = new WebSocket(
          `${wsUrl}/ws/comments/${episode_id}/?token=${token}`
        );

        websocket.onopen = () => {
          console.log("WebSocket Connected");
          setWsConnected(true);
          setError(null); // Clear any previous errors
        };

        websocket.onmessage = (event) => {
          try {
            console.log("WebSocket message received:", event.data);
            const data = JSON.parse(event.data);
            setComments((prevComments) => [
              {
                username: data.username,
                message: data.message,
                timestamp: data.timestamp || new Date().toLocaleString(),
              },
              ...prevComments,
            ]);
          } catch (err) {
            console.error("Error parsing WebSocket message:", err);
          }
        };

        websocket.onerror = (error) => {
          console.error("WebSocket Error:", error);
          setWsConnected(false);
          setError("Lỗi kết nối WebSocket. Vui lòng thử lại sau.");
        };

        websocket.onclose = (event) => {
          console.log("WebSocket Disconnected", event.code, event.reason);
          setWsConnected(false);
        };

        setWs(websocket);

        // Cleanup function to close WebSocket when component unmounts
        return () => {
          if (websocket) {
            websocket.close();
          }
        };
      } catch (err) {
        console.error("Error creating WebSocket:", err);
        setError("Không thể tạo kết nối WebSocket. Vui lòng thử lại sau.");
      }
    } else {
      console.log("No token available, not connecting to WebSocket");
    }
  }, [episode_id]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("Bạn cần đăng nhập để đăng bình luận");
      return;
    }

    // Send message through WebSocket
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log("Sending message via WebSocket:", newComment);
      ws.send(JSON.stringify({ message: newComment }));
      setNewComment("");
    } else {
      console.error(
        "WebSocket not connected. State:",
        ws ? ws.readyState : "No WebSocket"
      );
      setError("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="comments-section">
      <h3>Bình luận</h3>

      {/* Phần hiển thị bình luận */}
      {loading ? (
        <div className="loading">Đang tải bình luận...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : comments.length === 0 ? (
        <div className="no-comments">
          Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
        </div>
      ) : (
        <div className="comments-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment-item">
              <div className="comment-header">
                <i className="fa-solid fa-user"></i>
                <span className="username">{comment.username}</span>
                <span className="timestamp">{comment.timestamp}</span>
              </div>
              <div className="comment-content">{comment.message}</div>
            </div>
          ))}
        </div>
      )}

      {/* Phần nhập bình luận */}
      <form onSubmit={handleSubmitComment} className="comment-form">
        <div id="nhap_bl">
          <i className="fa-solid fa-user"></i>
          <textarea
            placeholder={
              isLoggedIn
                ? wsConnected
                  ? "Thêm bình luận..."
                  : "Đang kết nối..."
                : "Đăng nhập để bình luận..."
            }
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={!isLoggedIn || !wsConnected}
          />
        </div>
        <button
          type="submit"
          className="submit-comment"
          disabled={!isLoggedIn || !wsConnected}
        >
          {isLoggedIn
            ? wsConnected
              ? "Gửi"
              : "Đang kết nối..."
            : "Đăng nhập để bình luận"}
        </button>
      </form>
    </div>
  );
};

export default Comment;
