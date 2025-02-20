import React from "react";
import "./page404.scss";
import LazyLoad from "react-lazyload";
function Page404() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "100px", margin: "0" }}>
        <img
          src="http://127.0.0.1:8000/static/assets/img/img_duong/page404error.jpg"
          alt="Snake with 3D glasses"
          style={{ width: "40%", marginTop: "5%" }}
        />
      </h1>
      <h2 style={{ fontSize: "30px", margin: "10px" }}>Page Not Found</h2>
      <p style={{ fontSize: "15px", margin: "20px" }}>
        Trang bạn đang tìm có thể đã bị xóa, được đổi tên hoặc tạm thời không
        khả dụng
      </p>
      <button
        onClick={() => window.history.back()}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "red",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          color: "white",
        }}
      >
        Quay lại trang trước
      </button>
    </div>
  );
}

export default Page404;
