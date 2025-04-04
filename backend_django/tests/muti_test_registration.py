from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.edge.service import Service as EdgeService
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.firefox.service import Service as FirefoxService
import time

def run_login_test(driver):
    try:
        # Mở trang đăng nhập
        driver.get("http://localhost:3000/login")
        time.sleep(1)
        
        # Chuyển sang form đăng ký
        driver.find_element(By.CLASS_NAME, "signup-button").click()
        time.sleep(1)
        
        # Nhập thông tin đăng ký không hợp lệ
        driver.find_element(By.ID, "signup-username").send_keys("test_user")
        time.sleep(0.5)
        driver.find_element(By.ID, "signup-email").send_keys("test@example.com")
        time.sleep(0.5)
        driver.find_element(By.ID, "signup-password1").send_keys("")
        time.sleep(0.5)
        driver.find_element(By.ID, "signup-password2").send_keys("securesdpassword")
        time.sleep(0.5)
        
        # Nhấn nút đăng ký
        driver.find_element(By.ID, "su-dk").click()
        time.sleep(1)
        
        # Kiểm tra thông báo lỗi
        assert "Vui lòng nhập mật khẩu" in driver.page_source
        print(f"Test passed on {driver.capabilities['browserName']}")
        time.sleep(3)  # Đợi một chút để xem kết quả
    except Exception as e:
        print(f"Test failed on {driver.capabilities['browserName']}: {str(e)}")
    finally:
        driver.quit()

# Danh sách trình duyệt cần test
browsers = [
    {
        'name': 'Edge',
        'service': EdgeService(executable_path="../drivers/msedgedriver.exe"),
        'driver': webdriver.Edge
    },
    {
        'name': 'Chrome',
        'service': ChromeService(executable_path="../drivers/chromedriver-win64/chromedriver.exe"),  # Thay đổi đường dẫn nếu cần
        'driver': webdriver.Chrome
    },
]

# Chạy test trên từng trình duyệt
for browser in browsers:
    try:
        driver = browser['driver'](service=browser['service'])
        run_login_test(driver)
    except Exception as e:
        print(f"Không thể khởi chạy {browser['name']}: {str(e)}")