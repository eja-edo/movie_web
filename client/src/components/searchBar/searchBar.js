import React, {useState, useEffect, useRef} from "react";
import "./searchBar.scss"; // You can create this file for styling
import ngayCuaChoRung from "../../assets/ngay-cua-cho-rung.png"; // Import hình ảnh giả định
import {Link, useNavigate} from "react-router-dom";

const SearchComponent = ({onSearch}) => {
    const [searchValue, setSearchValue] = useState("");
    const [suggestSearch, setSuggestSearch] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const searchContainerRef = useRef(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const navigate = useNavigate();

    // Debounce API call: Chỉ gọi API khi người dùng ngừng gõ
    useEffect(() => {
        if (!searchValue.trim()) {
            setSuggestSearch([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        const debounceTimeout = setTimeout(() => {
            const apiUrl = `${process.env.REACT_APP_API_URL}/api/movies/searchkeys/?q=${encodeURIComponent(searchValue)}`;

            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    setSuggestSearch(data.movies); // Đảm bảo suggestSearch là mảng
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching search results:", error);
                    setSuggestSearch([]);
                    setIsLoading(false);
                });
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [searchValue]);

    // Handle input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    // Handle search submission
    const handleSearchKey = (e) => {
        if (e.key === "Enter") {
            if (searchValue.trim()) {
                // Chuyển sang trang category với query tìm kiếm
                navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
                // Xóa giá trị trong ô input sau khi đã chuyển hướng
                setSearchValue("");
            }
            setIsSearchFocused(false);
        }
    };

    // Handle click outside to close suggestion box
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setIsSearchFocused(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle suggestion item click
    const handleSuggestionClick = (suggestion) => {
        setSearchValue(suggestion.title); // Chỉ lấy title (chuỗi) để gán vào searchValue
        onSearch(suggestion.title); // Truyền title cho onSearch
        setIsSearchFocused(false);
    };

    // Handle clear search
    const handleClearSearch = () => {
        setSearchValue(""); // Xóa nội dung ô input
        setSuggestSearch([]); // Xóa danh sách gợi ý
        setIsSearchFocused(false); // Ẩn danh sách gợi ý
    };

    // Handle mouse enter and leave for suggestion items
    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };
    return (
        <div className="search-component" ref={searchContainerRef}>
            <div className="search-container">
                <i className="fa-solid fa-magnifying-glass search-icon"></i>
                <input type="text" id="search" className="search-input" placeholder="Tìm kiếm phim" autoComplete="off" value={searchValue} onChange={handleSearchChange} onKeyUp={handleSearchKey} onFocus={() => setIsSearchFocused(true)} />
                {searchValue && <i className="fa-solid fa-times close-icon" onClick={handleClearSearch}></i>}
            </div>

            {isSearchFocused && (
                <>
                    {isLoading && <div className="loading-spinner">Đang tải...</div>}
                    {!isLoading && suggestSearch.length > 0 && (
                        <div className="suggest-search">
                            <div className="suggest-header">Danh sách phim</div>
                            {suggestSearch.map((item, index) => (
                                <Link to={`/detail/${item.movie_id}`} className="suggest-item-wrap" key={item.movie_id} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave} onClick={handleClearSearch}>
                                    <div key={index} className="suggest-item">
                                        <img src={`${process.env.REACT_APP_API_URL}${item.poster_url}`} alt={item.title} className="suggest-item-image" />
                                        {console.log("Item: ", item)}
                                        <div className="suggest-item-content">
                                            <span className="suggest-item-title">{item.title}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                    {!isLoading && suggestSearch.length === 0 && searchValue.trim() && (
                        <div className="suggest-search">
                            <div className="suggest-header">Danh sách phim</div>
                            <div className="none-results">Không tìm thấy kết quả</div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchComponent;
