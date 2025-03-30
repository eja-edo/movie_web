import React, { useState, useEffect } from "react";
import "./comment.scss";

const Comment = ({ episode_id }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Kết nối WebSocket khi component mount
    const token = localStorage.getItem("access_token");
    const websocket = new WebSocket(
      `ws://localhost:8000/ws/comments/${episode_id}/?token=${token}`
    );

    websocket.onopen = () => {
      console.log("WebSocket Connected");
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setComments((prevComments) => [
        ...prevComments,
        {
          username: data.username,
          message: data.message,
          timestamp: new Date().toLocaleString(),
        },
      ]);
    };

    websocket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    setWs(websocket);

    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, [episode_id]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          message: newComment,
        })
      );
      setNewComment("");
    }
  };

  return (
    <div className="comments-section">
      <h3>Bình luận</h3>

      {/* Phần hiển thị bình luận */}
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

      {/* Phần nhập bình luận */}
      <form onSubmit={handleSubmitComment} className="comment-form">
        <div id="nhap_bl">
          <i className="fa-solid fa-user"></i>
          <textarea
            placeholder="Thêm bình luận..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-comment">
          Gửi
        </button>
      </form>
    </div>
  );
};

export default Comment;
