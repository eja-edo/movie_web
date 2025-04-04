# Kiểm thử cho chức năng đăng nhập
from selenium import webdriver
from selenium.webdriver.edge.service import Service
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

# Đường dẫn đến WebDriver Edge
edge_driver_path = "../drivers/msedgedriver.exe"  # Thay đổi đường dẫn nếu cần

# Khởi tạo driver cho Microsoft Edge
service = Service(executable_path=edge_driver_path)
driver = webdriver.Edge(service=service)
time.sleep(0.5)
# Mở trang đăng ký
driver.get("http://localhost:3000/login")
time.sleep(0.5)
# Nhấn nút vào form đăng ký
driver.find_element(By.CLASS_NAME, "signup-button").click()
time.sleep(0.5)
# Nhập thông tin vào các trường đăng ký
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
time.sleep(3) 
# Kiểm tra xem thông báo thành công có xuất hiện không
assert "Vui lòng nhập mật khẩu" in driver.page_source

# Đóng trình duyệt
driver.quit()
