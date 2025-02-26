import {useState, useEffect} from "react";
import "./DropdownMenu.scss";
import {Link} from "react-router-dom";

function toSlug(name) {
    return name
        .toLowerCase()
        .normalize("NFD") // Loại bỏ dấu tiếng Việt
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d") // Chuyển "đ" thành "d"
        .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu "-"
        .replace(/[^a-z0-9-]/g, ""); // Loại bỏ ký tự đặc biệt
}
// Hàm toSlug dùng để chuyển tên thể loại hoặc quốc gia thành slug để dùng trong URL

function DropdownMenu({apiEndpoint, type, onClose}) {
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false); // Kiểm tra API đã load xong chưa

    useEffect(() => {
        fetch(apiEndpoint)
            .then((response) => response.json())
            .then((data) => {
                setItems(data);
                setIsLoaded(true);
            }) // Đánh dấu đã load xong)
            .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
    }, [apiEndpoint]); // Lấy dữ liệu lại khi endpoint thay đổi

    // Nếu chưa load xong dữ liệu, không hiển thị dropdown
    if (!isLoaded || items.length === 0) return null;

    // Xác định class layout dựa trên số lượng phần tử
    const layoutClass = items.length >= 5 ? "two-columns" : "one-column";
    return (
        <ul className={`dropdown-menu multi-column-dropdown ${layoutClass}`}>
            {items.map((item) => (
                <li key={`${type}-${item.id || toSlug(item.name)}`}>
                    <Link to={`/category/${type}/${toSlug(item.name)}`} onClick={onClose}>
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default DropdownMenu;
