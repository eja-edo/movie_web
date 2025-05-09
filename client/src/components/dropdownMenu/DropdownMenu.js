import {useState, useEffect} from "react";
import "./DropdownMenu.scss";
import {Link, useLocation, useNavigate} from "react-router-dom";

function DropdownMenu({apiEndpoint, type, onClose}) {
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false); // Kiểm tra API đã load xong chưa
    const location = useLocation(); // Lấy URL hiện tại
    const navigate = useNavigate();
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
            {items.map((item, index) => {
                const itemId = item.genre_id || item.nation_id || item.id || `unknown-${index}`;

                // Lấy các query params hiện tại
                const searchParams = new URLSearchParams(location.search);

                // Xóa `genre_id` hoặc `nation_id` cũ (để tránh bị lỗi khi chọn thể loại & quốc gia cùng lúc)
                searchParams.delete("genre_id");
                searchParams.delete("nation_id");

                // Thêm `genre_id` hoặc `nation_id` mới
                searchParams.set(`${type}_id`, itemId);

                const queryString = searchParams.toString(); // Chuyển thành chuỗi URL

                return (
                    <li key={`${type}-${itemId}`}>
                        <Link to={`/category/${type}?${queryString}`} onClick={onClose}>
                            {item.name}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

export default DropdownMenu;
