# Đóng tiến trình Node
taskkill /IM node.exe /F 2>$null

# Thiết lập biến môi trường
$env:ANDROID_HOME = "D:\Android\Sdk"
$env:ANDROID_SDK_ROOT = "D:\Android\Sdk"
$env:PATH = "$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\tools;$env:PATH"

# Khởi động Appium với cấu hình đúng
appium `
    --log-level debug `
    --allow-insecure chromedriver_autodownload