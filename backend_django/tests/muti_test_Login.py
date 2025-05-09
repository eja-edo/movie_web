import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.service import Service as EdgeService
from selenium.webdriver.chrome.service import Service as ChromeService
import time

# Fixture cung cấp driver cho các trình duyệt khác nhau
@pytest.fixture(params=['edge', 'chrome'])
def driver(request):
    if request.param == 'edge':
        service = EdgeService(executable_path="../drivers/msedgedriver.exe")
        driver = webdriver.Edge(service=service)
    elif request.param == 'chrome':
        service = ChromeService(executable_path="../drivers/chromedriver-win64/chromedriver.exe")
        driver = webdriver.Chrome(service=service)
    
    yield driver
    driver.quit()

# Test case chính
def test_login(driver):
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
        time.sleep(3)
    except Exception as e:
        pytest.fail(f"Test failed on {driver.capabilities['browserName']}: {str(e)}")