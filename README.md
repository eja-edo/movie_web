SMovie - Nền tảng Xem Phim Trực Tuyến
Smovie là một trong những trang web xem phim trực tuyến được xây dựng bởi nhóm sinh viên Nguyễn Hải Dương, Vũ Nguyễn Duy Anh, Phạm Ngọc Khánh Duy. Với mục tiêu mang đến những phút giây giải trí tuyệt vời, Smovie đảm bảo sẽ là một nơi giải trí hoàn hảo cho mọi người có nhu cầu giải trí.

Tính năng chính
Thư viện phim phong phú với nhiều thể loại
Hệ thống tài khoản người dùng (đăng ký, đăng nhập, quản lý hồ sơ)
Tìm kiếm và lọc phim theo nhiều tiêu chí
Phát video chất lượng cao với nhiều tùy chọn
Giao diện người dùng thân thiện, đáp ứng trên nhiều thiết bị
Yêu cầu hệ thống
Python 3.8+
Node.js 14+
PostgreSQL
Redis (cho cache và hàng đợi)
Nginx (cho môi trường production)
Cài đặt và Chạy
Cài đặt tự động (Windows)
Sử dụng script tự động để cài đặt và chạy dự án:

Script này sẽ cài đặt tất cả các thành phần cần thiết và khởi động dịch vụ.

Cài đặt thủ công
Backend (Django)
Tạo và kích hoạt môi trường ảo:
Cài đặt các gói phụ thuộc:
Cấu hình cơ sở dữ liệu:
Tạo tài khoản admin:
Chạy server:
Frontend (React)
Cài đặt các gói phụ thuộc:
Chạy ứng dụng:
Cấu trúc dự án
smovie/
├── backend_django/        # Backend Django
│   ├── apps/              # Các ứng dụng Django
│   ├── backend_django/    # Cấu hình chính
│   ├── media/             # File phương tiện người dùng tải lên
│   ├── staticfiles/       # File tĩnh
│   └── venv/              # Môi trường ảo Python
├── client/                # Frontend React
│   ├── public/            # File tĩnh

Môi trường và Phiên bản
Dự án hỗ trợ nhiều môi trường khác nhau:

development: Môi trường phát triển cục bộ
staging: Môi trường kiểm thử
production: Môi trường sản phẩm
Cấu hình môi trường và phiên bản được đặt trong file .env:

URL Dự án
Frontend: http://localhost:3000
Backend API: http://localhost:8000
Admin Django: http://localhost:8000/admin
Nginx (production): http://smovie.com
Đóng góp
Nếu bạn muốn đóng góp cho dự án, vui lòng:

Fork repository
Tạo nhánh tính năng (git checkout -b feature/amazing-feature)
Commit thay đổi (git commit -m 'Add some amazing feature')
Push lên nhánh (git push origin feature/amazing-feature)
Tạo Pull Request

Liên hệ
Nếu có bất kỳ câu hỏi hoặc góp ý nào, vui lòng liên hệ qua email: haiduong04lc@gmail.com / số điện thoại : 0985082004
