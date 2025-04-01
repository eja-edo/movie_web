@echo off
setlocal enabledelayedexpansion
title WebXemPhim Setup and Run Script

:: Kiểm tra quyền Administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo This script requires Administrator privileges.
    echo Please run as Administrator.
    pause
    exit /b 1
)

:: Hiển thị menu
:menu
cls
echo ====================================
echo    WebXemPhim Setup and Run Script
echo ====================================
echo.
echo [1] Full Setup (Install Everything)
echo [2] Quick Setup (Skip Existing Components)
echo [3] Start All Services
echo [4] Stop All Services
echo [5] Check Service Status
echo [6] View Logs
echo [7] Exit
echo.
set "choice="
set /p choice="Enter your choice (1-7): "

:: Xử lý lựa chọn
if "%choice%"=="1" goto full_setup
if "%choice%"=="2" goto quick_setup
if "%choice%"=="3" goto start_services
if "%choice%"=="4" goto stop_services
if "%choice%"=="5" goto check_status
if "%choice%"=="6" goto view_logs
if "%choice%"=="7" goto end
goto menu

:: Full Setup
:full_setup
echo.
echo Starting Full Setup...
echo.

:: Kiểm tra và cài đặt Python
python --version >nul 2>&1
if %errorLevel% neq 0 (
    echo Python is not installed.
    set "install_python="
    set /p install_python="Press Enter to install Python 3.11 or any key to skip: "
    if "%install_python%"=="" (
        echo Installing Python...
        powershell -Command "& {Invoke-WebRequest -Uri 'https://www.python.org/ftp/python/3.11.0/python-3.11.0-amd64.exe' -OutFile 'python-installer.exe'}"
        start /wait python-installer.exe /quiet InstallAllUsers=1 PrependPath=1
        del python-installer.exe
    ) else (
        echo Python installation skipped.
        pause
        exit /b 1
    )
)

:: Kiểm tra và cài đặt Node.js
node --version >nul 2>&1
if %errorLevel% neq 0 (
    echo Node.js is not installed.
    set "install_node="
    set /p install_node="Press Enter to install Node.js 18.17 or any key to skip: "
    if "%install_node%"=="" (
        echo Installing Node.js...
        powershell -Command "& {Invoke-WebRequest -Uri 'https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi' -OutFile 'node-installer.msi'}"
        start /wait msiexec /i node-installer.msi /qn
        del node-installer.msi
    ) else (
        echo Node.js installation skipped.
        pause
        exit /b 1
    )
)

:: Kiểm tra và cài đặt Redis
netstat -ano | findstr ":6379" >nul
if %errorLevel% neq 0 (
    echo Redis is not installed.
    set "install_redis="
    set /p install_redis="Press Enter to install Redis or any key to skip: "
    if "%install_redis%"=="" (
        echo Installing Redis...
        powershell -Command "& {Invoke-WebRequest -Uri 'https://github.com/microsoftarchive/redis/releases/download/win-3.0.504/Redis-x64-3.0.504.msi' -OutFile 'Redis-x64-3.0.504.msi'}"
        start /wait msiexec /i Redis-x64-3.0.504.msi /qn
        del Redis-x64-3.0.504.msi
        
        :: Đợi Redis cài đặt xong
        timeout /t 5 /nobreak >nul
        
        :: Kiểm tra lại sau khi cài đặt

        netstat -ano | findstr ":6379" >nul

        if %errorLevel% equ 0 (
            echo Redis installed successfully!
        ) else (
            echo Redis installation failed. Please try again.
            pause
            exit /b 1
        )
    ) else (
        echo Redis installation skipped.
        pause
        exit /b 1
    )
) else (
    echo Redis is already installed.
)

:: Kiểm tra và cài đặt Nginx
netstat -ano | findstr ":80" >nul
if %errorLevel% neq 0 (
    echo Nginx is not installed.
    set "install_nginx="
    set /p install_nginx="Press Enter to install Nginx or any key to skip: "
    if "%install_nginx%"=="" (
        echo Installing Nginx...
        powershell -Command "& {Invoke-WebRequest -Uri 'http://nginx.org/download/nginx-1.20.2.zip' -OutFile 'nginx.zip'}"
        powershell -Command "& {Expand-Archive -Path 'nginx.zip' -DestinationPath 'C:\nginx' -Force}"
        del nginx.zip
    ) else (
        echo Nginx installation skipped.
        pause
        exit /b 1
    )
)

:: Setup Backend
echo Setting up Backend...
if not exist "backend_django\venv" (
    echo Creating Python virtual environment...
    cd backend_django
    python -m venv venv
    call venv\Scripts\activate.bat
    python -m pip install --upgrade pip
    pip install -r requirements.txt
    cd ..
)

:: Setup Frontend
echo Setting up Frontend...
cd client
echo Installing frontend dependencies...
npm install
cd ..

:: Cấu hình Nginx
echo Configuring Nginx...
set "config_nginx="
set /p config_nginx="Press Enter to configure Nginx or any key to skip: "
if "%config_nginx%"=="" (
    :: Lấy đường dẫn hiện tại và chuyển đổi dấu \ thành /
    for %%I in ("%CD%") do set "CURRENT_PATH=%%~fI"
    set "CURRENT_PATH=%CURRENT_PATH:\=/%"

    :: Đọc và cập nhật nội dung file nginx.conf
    powershell -Command "& {(Get-Content 'nginx.conf') -replace '/path/to/your/media/', '%CURRENT_PATH%/backend_django/media/' -replace '/path/to/your/static/', '%CURRENT_PATH%/backend_django/static/' -replace '/path/to/your/static_sv/', '%CURRENT_PATH%/backend_django/static_sv/' -replace '/path/to/your/hls/', '%CURRENT_PATH%/backend_django/hls/' | Set-Content 'C:\nginx\conf\nginx.conf'}"
)

:: Cấu hình hosts file
echo Configuring hosts file...
set "config_hosts="
set /p config_hosts="Press Enter to add smovie.com to hosts file or any key to skip: "
if "%config_hosts%"=="" (
    echo Adding smovie.com to hosts file...
    echo 127.0.0.1 smovie.com >> C:\Windows\System32\drivers\etc\hosts
)

:: Tạo các thư mục cần thiết
echo Creating required directories...
mkdir "backend_django\media" 2>nul
mkdir "backend_django\static" 2>nul
mkdir "backend_django\static_sv" 2>nul
mkdir "backend_django\hls" 2>nul

echo.
echo Full setup completed successfully!
echo.
pause
goto menu

:: Quick Setup
:quick_setup
echo.
echo Starting Quick Setup...
echo.

:: Setup Backend (nếu chưa có)
if not exist "backend_django\venv" (
    echo Setting up Backend...
    cd backend_django
    python -m venv venv
    call venv\Scripts\activate.bat
    python -m pip install --upgrade pip
    pip install -r requirements.txt
    cd ..
)

:: Setup Frontend (nếu chưa có)
if not exist "client\node_modules" (
    echo Setting up Frontend...
    cd client
    npm install
    cd ..
)

:: Tạo các thư mục cần thiết
echo Creating required directories...
mkdir "backend_django\media" 2>nul
mkdir "backend_django\static" 2>nul
mkdir "backend_django\static_sv" 2>nul
mkdir "backend_django\hls" 2>nul

echo.
echo Quick setup completed successfully!
echo.
pause
goto menu

:: Khởi động các service
:start_services
echo.
echo Starting all services...

:: Kiểm tra và khởi động Redis
netstat -ano | findstr ":6379" >nul
if %errorLevel% neq 0 (
    echo Starting Redis...
    start /B redis-server
    timeout /t 2 /nobreak >nul
)

:: Kiểm tra và khởi động Nginx
netstat -ano | findstr ":80" >nul
if %errorLevel% neq 0 (
    echo Starting Nginx...
    start /B C:\nginx\nginx.exe
    timeout /t 2 /nobreak >nul
)

:: Khởi động Backend
echo Starting Django backend...
start cmd /k "cd backend_django && venv\Scripts\activate.bat && python manage.py runserver"

:: Khởi động Frontend
echo Starting React frontend...
start cmd /k "cd client && npm start"

echo.
echo All services started successfully!
echo.
echo Project URLs:
echo - Frontend: http://localhost:3000
echo - Backend API: http://localhost:8000
echo - Nginx: http://localhost
echo - Domain: http://smovie.com
echo.
pause
goto menu

:: Dừng các service
:stop_services
echo.
echo Stopping all services...
taskkill /F /IM node.exe >nul 2>&1
taskkill /F /IM python.exe >nul 2>&1
taskkill /F /IM nginx.exe >nul 2>&1
taskkill /F /IM redis-server.exe >nul 2>&1
echo All services stopped successfully!
pause
goto menu

:: Kiểm tra trạng thái các service
:check_status
echo.
echo Checking service status...
echo.

:: Kiểm tra Redis (port 6379)
netstat -ano | findstr ":6379" >nul
if %ERRORLEVEL% == 0 (
    echo Redis: Running on port 6379
) else (
    echo Redis: Not running
)

:: Kiểm tra Nginx (port 80)
netstat -ano | findstr ":80" >nul
if %ERRORLEVEL% == 0 (
    echo Nginx: Running on port 80
) else (
    echo Nginx: Not running
)

:: Kiểm tra Django Backend (port 8000)
netstat -ano | findstr ":8000" >nul
if %ERRORLEVEL% == 0 (
    echo Django Backend: Running on port 8000
) else (
    echo Django Backend: Not running
)

:: Kiểm tra React Frontend (port 3000)
netstat -ano | findstr ":3000" >nul
if %ERRORLEVEL% == 0 (
    echo React Frontend: Running on port 3000
) else (
    echo React Frontend: Not running
)

echo.
pause
goto menu

:: Xem logs
:view_logs
echo.
echo Viewing service logs...
echo.
echo [1] Frontend Logs
echo [2] Backend Logs
echo [3] Nginx Logs
echo [4] Redis Logs
echo [5] Back to Menu
echo.
set /p log_choice="Enter your choice (1-5): "

if "%log_choice%"=="1" (
    if exist "client\node_modules\.cache" (
        type "client\node_modules\.cache\*.log"
    ) else (
        echo No frontend logs found.
    )
)
if "%log_choice%"=="2" (
    if exist "backend_django\logs" (
        type "backend_django\logs\*.log"
    ) else (
        echo No backend logs found.
    )
)
if "%log_choice%"=="3" (
    if exist "C:\nginx\logs" (
        type "C:\nginx\logs\*.log"
    ) else (
        echo No Nginx logs found.
    )
)
if "%log_choice%"=="4" (
    if exist "C:\Program Files\Redis\logs" (
        type "C:\Program Files\Redis\logs\*.log"
    ) else (
        echo No Redis logs found.
    )
)
if "%log_choice%"=="5" goto menu
pause
goto view_logs

:: Kết thúc
:end
echo.
echo Thank you for using WebXemPhim Setup and Run Script!
echo.
exit /b 0 