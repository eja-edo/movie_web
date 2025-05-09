#!/bin/bash
# WebXemPhim Backend Setup Script for Linux Hosting

echo "======================================"
echo "    WebXemPhim Backend Setup Script   "
echo "======================================"
echo

# Kiểm tra và cài đặt các phụ thuộc
check_install() {
    if ! command -v $1 &> /dev/null; then
        echo "$2 chưa được cài đặt. Đang cài đặt $2..."
        return 1
    else
        echo "$2 đã được cài đặt."
        return 0
    fi
}

# Kiểm tra và cài đặt Python
if ! check_install python3 "Python"; then
    sudo apt-get update
    sudo apt-get install -y python3 python3-pip python3-venv
fi

# Kiểm tra và cài đặt PostgreSQL
if ! check_install psql "PostgreSQL"; then
    sudo apt-get install -y postgresql postgresql-contrib
    sudo systemctl enable postgresql
    sudo systemctl start postgresql
    
    # Tạo database và user
    echo "Tạo database và user PostgreSQL..."
    sudo -u postgres psql -c "CREATE DATABASE movie_web;"
    sudo -u postgres psql -c "CREATE USER webxemphim WITH PASSWORD 'password';"
    sudo -u postgres psql -c "ALTER ROLE webxemphim SET client_encoding TO 'utf8';"
    sudo -u postgres psql -c "ALTER ROLE webxemphim SET default_transaction_isolation TO 'read committed';"
    sudo -u postgres psql -c "ALTER ROLE webxemphim SET timezone TO 'UTC';"
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE movie_web TO webxemphim;"
fi

# Kiểm tra và cài đặt Redis
if ! check_install redis-server "Redis"; then
    sudo apt-get install -y redis-server
    sudo systemctl enable redis-server
    sudo systemctl start redis-server
fi

# Kiểm tra và cài đặt Nginx
if ! check_install nginx "Nginx"; then
    sudo apt-get install -y nginx
    sudo systemctl enable nginx
    sudo systemctl start nginx
fi

# Lấy đường dẫn hiện tại
CURRENT_PATH=$(pwd)
BACKEND_PATH="$CURRENT_PATH/backend_django"
FRONTEND_PATH="$CURRENT_PATH/client"

# Tạo và kích hoạt môi trường ảo
echo "Tạo môi trường ảo Python..."
cd $BACKEND_PATH
python3 -m venv venv
source venv/bin/activate

# Cài đặt các gói phụ thuộc
echo "Cài đặt các gói phụ thuộc..."
pip install --upgrade pip
pip install -r requirements.txt

# Cài đặt Gunicorn và Daphne
echo "Cài đặt Gunicorn và Daphne..."
pip install gunicorn daphne

# Tạo các thư mục cần thiết
echo "Tạo các thư mục cần thiết..."
mkdir -p logs

# # Tạo file .env nếu chưa tồn tại
# if [ ! -f .env ]; then
#     echo "Tạo file .env..."
#     cat > .env << EOL
# DEBUG=False
# SECRET_KEY=your-secret-key-change-this
# ALLOWED_HOSTS=.smovie.com,localhost,127.0.0.1
# DATABASE_URL=postgres://webxemphim:password@localhost:5432/movie_web
# EMAIL_HOST_PASSWORD=your-email-password
# ENCRYPTION_KEY=your-secret-key-32-bytes-long!!
# EOL
#     echo "File .env đã được tạo. Vui lòng cập nhật các giá trị trong file này."
# fi

# Chạy migrations
echo "Áp dụng migrations..."
python manage.py makemigrations
python manage.py migrate

# Chạy các file SQL
echo "Chạy các file SQL trong PostgreSQL..."
if [ -f QueryDatabase.sql ]; then
    sudo -u postgres psql -d movie_web -f QueryDatabase.sql
    echo "Đã chạy file QueryDatabase.sql"
else
    echo "Không tìm thấy file QueryDatabase.sql"
fi

if [ -f insert_movies.sql ]; then
    sudo -u postgres psql -d movie_web -f insert_movies.sql
    echo "Đã chạy file insert_movies.sql"
else
    echo "Không tìm thấy file insert_movies.sql"
fi

# Tạo superuser
echo "Bạn có muốn tạo tài khoản admin không? (y/n)"
read create_admin
if [ "$create_admin" = "y" ]; then
    python manage.py createsuperuser
fi

# Collect static files
echo "Thu thập các file tĩnh..."
python manage.py collectstatic --noinput

# Cài đặt frontend
echo "Bạn có muốn cài đặt và build frontend không? (y/n)"
read setup_frontend
if [ "$setup_frontend" = "y" ]; then
    echo "Cài đặt và build frontend..."
    cd $FRONTEND_PATH
    
    # Kiểm tra và cài đặt Node.js
    if ! check_install node "Node.js"; then
        curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
    
    # Cài đặt dependencies và build
    npm install
    npm run build
    
    echo "Frontend đã được build thành công."
fi

# Tạo file systemd service cho Gunicorn
echo "Tạo file service cho Gunicorn..."
cat > webxemphim.service << EOL
[Unit]
Description=WebXemPhim Gunicorn daemon
After=network.target

[Service]
User=$(whoami)
Group=$(whoami)
WorkingDirectory=$BACKEND_PATH
ExecStart=$BACKEND_PATH/venv/bin/gunicorn --access-logfile - --workers 3 --bind unix:$BACKEND_PATH/webxemphim.sock backend_django.wsgi:application
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOL

# Tạo file systemd service cho Daphne (WebSockets)
echo "Tạo file service cho Daphne..."
cat > webxemphim-daphne.service << EOL
[Unit]
Description=WebXemPhim Daphne daemon
After=network.target

[Service]
User=$(whoami)
Group=$(whoami)
WorkingDirectory=$BACKEND_PATH
Environment="DJANGO_SETTINGS_MODULE=backend_django.settings"
Environment="ENCRYPTION_KEY=your-secret-key-32-bytes-long!!"
ExecStart=$BACKEND_PATH/venv/bin/daphne -u $BACKEND_PATH/webxemphim-daphne.sock backend_django.asgi:application
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOL

echo "Cài đặt service files..."
sudo cp webxemphim.service /etc/systemd/system/
sudo cp webxemphim-daphne.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable webxemphim.service
sudo systemctl enable webxemphim-daphne.service

# Tạo cấu hình Nginx (chỉ HTTP, không cần HTTPS)
echo "Tạo cấu hình Nginx (HTTP)..."
cat > webxemphim_nginx.conf << EOL
server {
    listen 80;
    server_name smovie.com;
    
    # Thư mục chứa ReactJS build
    root $FRONTEND_PATH/build;
    index index.html;

    location / {
        try_files \$uri /index.html;
    }    

    # Chuyển hướng các file tĩnh của ReactJS
    location /static/ {
        root $FRONTEND_PATH/build;
        expires 1y;
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Gzip compression (tăng tốc tải)
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
    gzip_vary on;

    # Cấu hình proxy cho API Django
    location /api/ {
        proxy_pass http://unix:$BACKEND_PATH/webxemphim.sock;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        
        proxy_redirect off;
        proxy_buffering off;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "Upgrade";
    }

    # Cấu hình WebSocket
    location /ws/ {
        proxy_pass http://unix:$BACKEND_PATH/webxemphim-daphne.sock;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }

    # Cấu hình phục vụ Static Files của Django
    location /static_sv/ {
        alias $BACKEND_PATH/staticfiles/;
        autoindex on;
        access_log off;
        expires 1y;
    }
    
    # Cấu hình truy cập media (Hình ảnh, video...)
    location /media/ {
        alias $BACKEND_PATH/media/;
        autoindex on;
        access_log off;
        expires max;
    }

    # Cấu hình truy cập HLS video streaming
    location /hls/ {
        root $BACKEND_PATH/media/;
        add_header Cache-Control no-cache;
        add_header Access-Control-Allow-Origin *;
        types {
            application/vnd.apple.mpegurl m3u8;
            video/mp2t ts;
        }
        autoindex on; # Hiển thị danh sách file để kiểm tra dễ dàng
    }
}
EOL

echo "Cài đặt cấu hình Nginx..."
sudo cp webxemphim_nginx.conf /etc/nginx/sites-available/webxemphim
sudo ln -s /etc/nginx/sites-available/webxemphim /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

# Xóa đoạn kiểm tra chứng chỉ SSL vì không cần thiết nữa

# Khởi động các service
echo "Khởi động các service..."
sudo systemctl start webxemphim.service
sudo systemctl start webxemphim-daphne.service

echo
echo "======================================"
echo "Cài đặt backend hoàn tất!"
echo
echo "Thông tin truy cập:"
echo "- Website: http://smovie.com"
echo "- API: http://smovie.com/api/"
echo "- WebSocket: ws://smovie.com/ws/"
echo
echo "Để kiểm tra trạng thái service:"
echo "- sudo systemctl status webxemphim.service"
echo "- sudo systemctl status webxemphim-daphne.service"
echo
echo "Để xem logs:"
echo "- sudo journalctl -u webxemphim.service"
echo "- sudo journalctl -u webxemphim-daphne.service"
echo "======================================"





