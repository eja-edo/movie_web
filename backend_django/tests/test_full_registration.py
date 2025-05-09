import pandas as pd
from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os
import time

# Đường dẫn đến WebDriver Edge
edge_driver_path = "../drivers/msedgedriver.exe"  # Thay đổi đường dẫn nếu cần

# Khởi tạo driver cho Microsoft Edge
service = Service(executable_path=edge_driver_path)
driver = webdriver.Edge(service=service)

# Đặt thời gian chờ mặc định cho driver
driver.implicitly_wait(60)

# Đọc dữ liệu từ file CSV bằng pandas
df = pd.read_csv('./test_data.csv')

for idx, row in df.iterrows():  # Duyệt từng dòng trong DataFrame
    # Mở trang đăng ký
    driver.get("http://localhost:3000/login")
    
    # Nhấn nút vào form đăng ký
    driver.find_element(By.CLASS_NAME, "signup-button").click()

    # Hàm kiểm tra và nhập dữ liệu nếu không rỗng
    def send_keys_if_not_empty(element_id, value):
        if isinstance(value, str) and value.strip():  # Kiểm tra nếu không phải chuỗi rỗng
            driver.find_element(By.ID, element_id).send_keys(value)

    # Nhập thông tin vào các trường đăng ký từ CSV (bỏ qua nếu trống)
    send_keys_if_not_empty("signup-username", row['username'])
    send_keys_if_not_empty("signup-email", row['email'])
    send_keys_if_not_empty("signup-password1", row['password1'])
    send_keys_if_not_empty("signup-password2", row['password2'])

    # Nhấn nút đăng ký
    driver.find_element(By.ID, "su-dk").click()

    # Kiểm tra thông báo lỗi hoặc thành công
    error_message = row['expected_result']
    
    try:
        # Đợi tối đa 60 giây cho thông báo lỗi hoặc thành công xuất hiện
        WebDriverWait(driver, 60).until(
            EC.presence_of_element_located((By.XPATH, "//div[@class='message-alert']"))  # Thay bằng XPath chính xác của phần tử thông báo
        )

        # Kiểm tra nội dung của thông báo
        page_source = driver.page_source
        if isinstance(error_message, str) and error_message not in page_source:
            # Nếu thông báo không đúng, chụp lại màn hình
            screenshot_path = f"tests/screenshots/test_case_{idx + 1}.png"
            os.makedirs(os.path.dirname(screenshot_path), exist_ok=True)  # Tạo thư mục nếu chưa có
            driver.save_screenshot(screenshot_path)
            print(f"Test case {idx + 1} failed. Screenshot saved to {screenshot_path}.")
        else:
            print(f"Test case {idx + 1} passed.")
    
    except TimeoutException:
        # Nếu không tìm thấy thông báo sau 60 giây
        screenshot_path = f"tests/screenshots/test_case_{idx + 1}_timeout.png"
        os.makedirs(os.path.dirname(screenshot_path), exist_ok=True)  # Tạo thư mục nếu chưa có
        driver.save_screenshot(screenshot_path)
        print(f"Test case {idx + 1} failed due to timeout. Screenshot saved to {screenshot_path}.")
    time.sleep(1)  # Đợi một chút trước khi chuyển sang test case tiếp theo
# Đóng trình duyệt
driver.quit()
