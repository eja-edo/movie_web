@echo off
setlocal enabledelayedexpansion
title WebXemPhim Project Runner

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
echo    WebXemPhim Project Control Panel
echo ====================================
echo.
echo [1] Start All Services
echo [2] Stop All Services
echo [3] Restart All Services
echo [4] Check Service Status
echo [5] View Logs
echo [6] Exit
echo.
set /p choice="Enter your choice (1-6): "

:: Xử lý lựa chọn
if "%choice%"=="1" goto start_services
if "%choice%"=="2" goto stop_services
if "%choice%"=="3" goto restart_services
if "%choice%"=="4" goto check_status
if "%choice%"=="5" goto view_logs
if "%choice%"=="6" goto end
goto menu

:: Khởi động các service
:start_services
echo.
echo Starting all services...

:: Kiểm tra và khởi động Redis
redis-cli ping >nul 2>&1
if %errorLevel% neq 0 (
    echo Starting Redis...
    start /B redis-server
    timeout /t 2 /nobreak >nul
)

:: Kiểm tra và khởi động Nginx
nginx -t >nul 2>&1
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

:: Khởi động lại các service
:restart_services
echo.
echo Restarting all services...
call :stop_services
timeout /t 2 /nobreak >nul
call :start_services
goto menu

:: Kiểm tra trạng thái các service
:check_status
echo.
echo Checking service status...
echo.

:: Kiểm tra Redis
redis-cli ping >nul 2>&1
if %errorLevel% equ 0 (
    echo Redis: Running
) else (
    echo Redis: Not running
)

:: Kiểm tra Nginx
nginx -t >nul 2>&1
if %errorLevel% equ 0 (
    echo Nginx: Running
) else (
    echo Nginx: Not running
)

:: Kiểm tra Python
python --version >nul 2>&1
if %errorLevel% equ 0 (
    echo Python: Installed
) else (
    echo Python: Not installed
)

:: Kiểm tra Node.js
node --version >nul 2>&1
if %errorLevel% equ 0 (
    echo Node.js: Installed
) else (
    echo Node.js: Not installed
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
echo Thank you for using WebXemPhim Project Control Panel!
echo.
exit /b 0
