import React from "react";
import './footer.scss'
function FooterComponents() {
    return (
        <footer>
            <div className="container">
                <div className="logo">
                    <img src="http://127.0.0.1:8000/static/assets//img/logo.png" alt="logo" style={{ width: '60px' }} />
                </div>
                <div className="footer">
                    <div className="contact-info">
                        Địa chỉ: Nhóm 2, D14CNPM4, Đại Học điện lực, Hoàng Quốc
                        Việt,Cổ Nhuế, Bắc Từ Liêm, Hà Nội
                        <br />
                        Email: abc@gmail.com
                        <br />
                        Hotline: 0123.456.789 (miễn phí)
                    </div>
                    <div className="nav-links">
                        <div className="nav-link">
                            <a href="../../GioiThieu/index.html">GIỚI THIỆU</a>
                        </div>
                        <div className="nav-link">QUY ĐỊNH</div>
                        <div className="nav-link">THÔNG TIN</div>
                    </div>
                </div>
                <div className="qr-code">
                    <img src="http://127.0.0.1:8000/static/assets//img/halls.png" alt="QR Code" style={{ width: '100px' }} />
                    <div>Quét mã QR để tải ứng dụng</div>
                </div>
            </div>
        </footer>
    )
}
export default FooterComponents