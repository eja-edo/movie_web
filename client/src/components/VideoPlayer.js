import React, { useRef, useEffect, useState } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ videoSrc }) => {
  const videoRef = useRef(null);
  const [isFastForwarding, setIsFastForwarding] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    if (Hls.isSupported() && videoSrc.endsWith(".m3u8")) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else {
      video.src = videoSrc;
    }
  }, [videoSrc]);

  // Hiệu ứng phím tắt
  useEffect(() => {
    const video = videoRef.current;
    const handleKeyDown = (e) => {
      if (!video) return;
      switch (e.key) {
        case "ArrowRight":
          video.currentTime += 10;
          break;
        case "ArrowLeft":
          video.currentTime -= 10;
          break;
        case " ":
          e.preventDefault();
          video.paused ? video.play() : video.pause();
          break;
        case "f":
          video.requestFullscreen();
          break;
        case "m":
          video.muted = !video.muted;
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Khi nhấn giữ chuột
  const handleMouseDown = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.0; // Tua nhanh
      setIsFastForwarding(true);
    }
  };

  // Khi thả chuột
  const handleMouseUp = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0; // Trở lại tốc độ bình thường
      setIsFastForwarding(false);
    }
  };

  // Thêm sự kiện khi thay đổi chế độ toàn màn hình
  useEffect(() => {
    const handleFullScreenChange = () => {
      if (document.fullscreenElement) {
        console.log("Video is in fullscreen mode");
      } else {
        console.log("Exited fullscreen");
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  // Tua video khi click vào bên trái hoặc bên phải
  const handleVideoClick = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const videoWidth = video.clientWidth;
    const clickPosition = e.nativeEvent.offsetX; // Lấy vị trí click trên video
    const leftBoundary = videoWidth * 0.2; // 20% bên trái
    const rightBoundary = videoWidth * 0.8; // 20% bên phải

    // Kiểm tra nếu click vào 20% ngoài cùng bên trái hoặc bên phải
    if (clickPosition < leftBoundary) {
      // Click vào 20% bên trái: Tua lại 10s
      video.currentTime = Math.max(0, video.currentTime - 10);
    } else if (clickPosition > rightBoundary) {
      // Click vào 20% bên phải: Tua nhanh 10s
      video.currentTime = Math.min(video.duration, video.currentTime + 10);
    }
    // Không có pause ở đây, chỉ thực hiện thao tác tua
    e.stopPropagation(); // Ngừng sự kiện click lan tỏa, tránh gây ảnh hưởng khác
  };

  return (
    <div
      style={{ position: "relative" }}
      onClick={(e) => e.stopPropagation()} // Ngừng sự kiện click lan tỏa ra ngoài
    >
      <video
        ref={videoRef}
        controls
        width="100%"
        style={{
          borderRadius: "5px",
          margin: "auto",
          boxSizing: "border-box",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleVideoClick} // Xử lý sự kiện click để tua video
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
