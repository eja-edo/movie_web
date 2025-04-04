import os
from appium import webdriver
from appium.options.android import UiAutomator2Options
import subprocess
import socket
import requests

# Cấu hình đường dẫn tuyệt đối
ANDROID_SDK_PATH = r"D:\Android\Sdk"
CHROMEDRIVER_PATH = r"E:\laptrinh_web\webxemphim\backend_django\drivers\chromedriver.exe"

# Ghi đè biến môi trường
os.environ.update({
    'ANDROID_HOME': ANDROID_SDK_PATH,
    'ANDROID_SDK_ROOT': ANDROID_SDK_PATH,
    'PATH': f"{ANDROID_SDK_PATH}\\platform-tools;{ANDROID_SDK_PATH}\\tools;{os.environ['PATH']}"
})

def get_host_ip():
    """Lấy địa chỉ IP thực của máy host"""
    try:
        # Cách 1: Lấy IP qua socket (chính xác hơn)
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        # Cách 2: Dự phòng nếu cách 1 không hoạt động
        return socket.gethostbyname(socket.gethostname())

def check_network_connection(url):
    """Kiểm tra kết nối đến server"""
    try:
        response = requests.get(url, timeout=5)
        return response.status_code == 200
    except:
        return False

def check_chromedriver():
    """Kiểm tra và khởi chạy ChromeDriver"""
    if not os.path.exists(CHROMEDRIVER_PATH):
        raise FileNotFoundError(f"Không tìm thấy ChromeDriver tại {CHROMEDRIVER_PATH}")
    
    try:
        version = subprocess.check_output([CHROMEDRIVER_PATH, "--version"]).decode()
        print(f"🛠️ ChromeDriver version: {version.strip()}")
        return True
    except Exception as e:
        print(f"⚠️ Lỗi khi kiểm tra ChromeDriver: {str(e)}")
        return False

def run_test():
    if not check_chromedriver():
        return

    # Lấy địa chỉ IP thực của máy host
    host_ip = get_host_ip()
    test_url = f"http://{host_ip}:3000/login"  # Sử dụng IP thay vì localhost
    
    # Kiểm tra kết nối đến server trước
    if not check_network_connection(test_url):
        print(f"❌ Không thể kết nối đến server tại {test_url}")
        print("ℹ️ Hãy đảm bảo server đang chạy và không bị chặn firewall")
        return

    options = UiAutomator2Options()
    options.platform_name = "Android"
    options.device_name = "Pixel_6_API_33"
    options.automation_name = "UiAutomator2"
    options.browser_name = "Chrome"
    
    # Cấu hình quan trọng
    options.set_capability('chromedriverExecutable', CHROMEDRIVER_PATH)
    options.set_capability('appium:androidSdkPath', ANDROID_SDK_PATH)
    options.set_capability('appium:autoGrantPermissions', True)
    options.set_capability('appium:ensureWebviewsHavePages', True)
    options.set_capability('appium:nativeWebScreenshot', True)
    
    # Thêm tùy chọn cho Chrome
    options.set_capability('appium:chromeOptions', {
        'w3c': True,
        'args': ['--no-sandbox', '--disable-dev-shm-usage']
    })

    driver = None
    try:
        print("🚀 Đang khởi tạo trình điều khiển...")
        driver = webdriver.Remote(
            "http://localhost:4723",
            options=options
        )
        
        # Kiểm tra phiên bản Chrome thực tế
        chrome_version = driver.capabilities.get('browserVersion', 'Không xác định')
        print(f"🌐 Phiên bản Chrome trên thiết bị: {chrome_version}")
        
        print(f"🔍 Đang mở trang web: {test_url}")
        driver.get(test_url)
        
        # Kiểm tra xem trang đã load xong chưa
        if "login" in driver.current_url.lower():
            print("✅ Đăng nhập thành công! Tiêu đề trang:", driver.title)
        else:
            print("⚠️ Có thể đăng nhập không thành công. URL hiện tại:", driver.current_url)
        
    except Exception as e:
        print(f"❌ Lỗi nghiêm trọng: {str(e)}")
        print("\n=== THÔNG TIN GỠ LỖI ===")
        print(f"Chromedriver path: {os.path.exists(CHROMEDRIVER_PATH)}")
        print(f"ADB devices: {subprocess.getoutput('adb devices')}")
        print(f"IP máy host: {host_ip}")
        print(f"Kết nối đến server: {'Thành công' if check_network_connection(test_url) else 'Thất bại'}")
        
    finally:
        if driver:
            print("🛑 Đóng trình duyệt...")
            driver.quit()

if __name__ == "__main__":
    run_test()