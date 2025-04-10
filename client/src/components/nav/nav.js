import React, { useState, useEffect } from "react";
import "./nav.scss";
import { useNavigate, useLocation } from "react-router-dom";
import movieAPI from "../../services/movieAPI";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import SearchBar from "../searchBar/searchBar";
function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [avt, setImg] = useState(null);
  const [login, setLogin] = useState(false);
  const [suggestSearch, setSuggest] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    setLogin(JSON.parse(localStorage.getItem("user"))?.login || false);
    setImg(JSON.parse(localStorage.getItem("user"))?.img_url || null);
    console.log(avt);
  }, [navigate]);

  // Kiểm tra xem URL hiện tại có chứa genre_id hoặc nation_id không
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const genreId = searchParams.get("genre_id");
    const nationId = searchParams.get("nation_id");

    if (genreId) {
      setActiveDropdown("genre");
    } else if (nationId) {
      setActiveDropdown("nation");
    } else {
      setActiveDropdown(null);
    }
  }, [location.search]);

  const handleLogout = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const raw = JSON.stringify({
      refreshToken: refreshToken,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/user/logout/`, requestOptions)
      .then((response) => response.text())
      .then(() => {
        console.log("đã logout");
        localStorage.setItem("accessToken", null);
        localStorage.setItem("refreshToken", null);
        localStorage.setItem("user", JSON.stringify({ login: false }));
        setLogin(false);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  const handleSearch = (a) => {
    const input = a.nextElementSibling;
    input.style.width = "300px";
    input.style.padding = "3px";
    a.style.color = "#000000";
    input.focus();
    document.getElementById("suggestSearch").style.display = "flex";
  };
  const [clickUser, setClickUser] = useState(false);

  // Hàm kiểm tra xem đường dẫn hiện tại có khớp với đường dẫn của menu item không
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Hàm kiểm tra xem dropdown có đang active không
  const isDropdownActive = (type) => {
    return activeDropdown === type;
  };

  return (
    <div id="header">
      <div id="main_content_header">
        <div id="min_menu">
          <a
            style={{ marginLeft: 10, marginRight: 10 }}
            onClick={handleMenuToggle}
          >
            <i
              className="fa-solid fa-bars"
              style={{ display: showMenu ? "none" : "flex", marginLeft: 15 }}
            ></i>
            <i
              className="fa-solid fa-x"
              style={{ display: showMenu ? "flex" : "none", marginLeft: 15 }}
            ></i>
          </a>
          {
            <ul
              style={{
                transform: showMenu
                  ? "translateX(150px)"
                  : "translateX(-150px)",
              }}
            >
              <li>
                <a
                  onClick={() => {
                    navigate("/TrangChu");
                  }}
                  target="main"
                  rel="noopener noreferrer"
                  className={isActivePath("/TrangChu") ? "active" : ""}
                >
                  <i className="fa-solid fa-house"></i> Trang chủ
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/TrangChu");
                  }}
                  target="main"
                  rel="noopener noreferrer"
                  className={isActivePath("/TrangChu") ? "active" : ""}
                >
                  Phim lẻ
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/TrangChu");
                  }}
                  target="main"
                  rel="noopener noreferrer"
                  className={isActivePath("/TrangChu") ? "active" : ""}
                >
                  Mới thêm
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/intro");
                  }}
                  target="main"
                  rel="noopener noreferrer"
                  className={isActivePath("/intro") ? "active" : ""}
                >
                  Giới thiệu
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/TrangChu");
                  }}
                  target="main"
                  rel="noopener noreferrer"
                  className={isActivePath("/TrangChu") ? "active" : ""}
                >
                  Danh sách của tôi
                </a>
              </li>
            </ul>
          }
        </div>
        <img
          src={`${process.env.REACT_APP_API_URL}/static_sv/assets//img/img_duong/logoweb.png`}
          alt=""
          style={{ width: "9%", height: "auto", cursor: "pointer" }}
          onClick={() => {
            navigate("/TrangChu");
          }}
        />
        <ul id="ul_left">
          <li>
            <a
              onClick={() => {
                navigate("/TrangChu");
              }}
              target="main"
              rel="noopener noreferrer"
              className={isActivePath("/TrangChu") ? "active" : ""}
            >
              Trang chủ
            </a>
          </li>
          {/* Dropdown Thể loại */}
          <li
            className="dropdown"
            onMouseEnter={() => setIsDropdownVisible(true)}
            onMouseLeave={() => setIsDropdownVisible(false)}
          >
            <a
              target="main"
              rel="noopener noreferrer"
              className={isDropdownActive("genre") ? "active" : ""}
            >
              Thể loại
            </a>

            {isDropdownVisible && (
              <DropdownMenu
                apiEndpoint={`${process.env.REACT_APP_API_URL}/api/core/genres/`}
                type="genre"
                onClose={() => setIsDropdownVisible(false)}
              />
            )}
          </li>
          {/* Dropdown Quốc gia */}
          <li
            className="dropdown"
            onMouseEnter={() => setIsDropdownVisible(true)}
            onMouseLeave={() => setIsDropdownVisible(false)}
          >
            <a
              target="main"
              rel="noopener noreferrer"
              className={isDropdownActive("nation") ? "active" : ""}
            >
              Quốc gia
            </a>

            {isDropdownVisible && (
              <DropdownMenu
                apiEndpoint={`${process.env.REACT_APP_API_URL}/api/core/nations/`}
                type="nation"
                onClose={() => setIsDropdownVisible(false)}
              />
            )}
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/newsScrip");
              }}
              target="main"
              rel="noopener noreferrer"
              className={isActivePath("/newsScrip") ? "active" : ""}
            >
              Tin tức
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/Intro");
              }}
              target="main"
              rel="noopener noreferrer"
              className={isActivePath("/Intro") ? "active" : ""}
            >
              Giới thiệu
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/mylist");
              }}
              target="main"
              rel="noopener noreferrer"
              className={isActivePath("/mylist") ? "active" : ""}
            >
              Danh sách của tôi
            </a>
          </li>
        </ul>
        <ul id="ul_right">
          <li className="search-list-item">
            <SearchBar onSearch={handleSearch} />
          </li>
          <li>
            <a>
              <i className="fa-regular fa-bell"></i>
            </a>
          </li>
          <li>
            {!login ? (
              <a
                onClick={() => {
                  navigate("/login");
                }}
              >
                <i className="fa-solid fa-right-to-bracket"></i>
              </a>
            ) : (
              <div
                id="login"
                onClick={(event) => {
                  setClickUser(clickUser ? false : true);
                }}
              >
                <img
                  src={
                    avt
                      ? process.env.REACT_APP_API_URL + avt
                      : `${process.env.REACT_APP_API_URL}/static_sv/assets/img/defaultImgUser.png`
                  }
                ></img>

                <ul style={{ display: clickUser ? "flex" : "none" }}>
                  <li style={{ borderBottom: "gray solid 1px" }}>
                    <a>Chỉnh sửa thông tin</a>
                  </li>
                  <li>
                    <a>Tài khoản và cài đặt</a>
                  </li>
                  <li
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    <a>Đăng xuất</a>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
