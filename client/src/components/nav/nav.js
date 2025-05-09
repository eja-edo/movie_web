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
  const [mobileDropdownType, setMobileDropdownType] = useState(null); // Thêm state để theo dõi dropdown nào đang mở trên mobile

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

  const handleSearch = () => {
    // This function is now handled by the SearchBar component
    // The SearchBar component manages its own state and functionality
    console.log("Search initiated");
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
          <a onClick={handleMenuToggle}>
            <i
              className="fa-solid fa-bars"
              style={{ display: showMenu ? "none" : "flex" }}
            ></i>
            <i
              className="fa-solid fa-x"
              style={{ display: showMenu ? "flex" : "none" }}
            ></i>
          </a>
          {
            <ul
              style={{
                transform: showMenu ? "translateX(0)" : "translateX(-100%)",
              }}
            >
              <li>
                <a
                  onClick={() => {
                    navigate("/TrangChu");
                    setShowMenu(false);
                  }}
                  className={isActivePath("/TrangChu") ? "active" : ""}
                >
                  <i className="fa-solid fa-house"></i> Trang chủ
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    // Nếu đang hiển thị dropdown này, đóng nó lại
                    if (mobileDropdownType === "genre") {
                      setMobileDropdownType(null);
                    } else {
                      // Ngược lại, hiển thị dropdown thể loại
                      setMobileDropdownType("genre");
                    }
                  }}
                  className={mobileDropdownType === "genre" ? "active" : ""}
                >
                  <i className="fa-solid fa-film"></i> Thể loại
                  {mobileDropdownType !== "genre" ? (
                    <i
                      className="fa-solid fa-chevron-down"
                      style={{ marginLeft: "5px" }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-chevron-up"
                      style={{ marginLeft: "5px" }}
                    ></i>
                  )}
                </a>
                {mobileDropdownType === "genre" && (
                  <DropdownMenu
                    apiEndpoint={`${process.env.REACT_APP_API_URL}/api/core/genres/`}
                    type="genre"
                    onClose={() => {
                      setMobileDropdownType(null);
                      setShowMenu(false); // Đóng menu mobile khi chọn xong
                    }}
                  />
                )}
              </li>
              <li>
                <a
                  onClick={() => {
                    // Nếu đang hiển thị dropdown này, đóng nó lại
                    if (mobileDropdownType === "nation") {
                      setMobileDropdownType(null);
                    } else {
                      // Ngược lại, hiển thị dropdown quốc gia
                      setMobileDropdownType("nation");
                    }
                  }}
                  className={mobileDropdownType === "nation" ? "active" : ""}
                >
                  <i className="fa-solid fa-earth-americas"></i> Quốc gia
                  {mobileDropdownType !== "nation" ? (
                    <i
                      className="fa-solid fa-chevron-down"
                      style={{ marginLeft: "5px" }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-chevron-up"
                      style={{ marginLeft: "5px" }}
                    ></i>
                  )}
                </a>
                {mobileDropdownType === "nation" && (
                  <DropdownMenu
                    apiEndpoint={`${process.env.REACT_APP_API_URL}/api/core/nations/`}
                    type="nation"
                    onClose={() => {
                      setMobileDropdownType(null);
                      setShowMenu(false); // Đóng menu mobile khi chọn xong
                    }}
                  />
                )}
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/newsScrip");
                    setShowMenu(false);
                  }}
                  className={isActivePath("/newsScrip") ? "active" : ""}
                >
                  <i className="fa-solid fa-newspaper"></i> Tin tức
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/intro");
                    setShowMenu(false);
                  }}
                  className={isActivePath("/intro") ? "active" : ""}
                >
                  <i className="fa-solid fa-circle-info"></i> Giới thiệu
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/mylist");
                    setShowMenu(false);
                  }}
                  className={isActivePath("/mylist") ? "active" : ""}
                >
                  <i className="fa-solid fa-list"></i> Danh sách của tôi
                </a>
              </li>
              {login && (
                <>
                  <li>
                    <a
                      onClick={() => {
                        handleLogout();
                        setShowMenu(false);
                      }}
                    >
                      <i className="fa-solid fa-sign-out-alt"></i> Đăng xuất
                    </a>
                  </li>
                </>
              )}
            </ul>
          }
        </div>
        <img
          src={`${process.env.REACT_APP_API_URL}/static_sv/assets//img/img_duong/logoweb.png`}
          alt="Logo"
          style={{
            width: "8%",
            height: "auto",
            cursor: "pointer",
            padding: "0",
          }}
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
            <a className={isDropdownActive("genre") ? "active" : ""}>
              Thể loại
            </a>

            {isDropdownVisible && (
              <DropdownMenu
                apiEndpoint={`${process.env.REACT_APP_API_URL}/api/core/genres/`}
                type="genre"
                onClose={() => {
                  setIsDropdownVisible(false);
                }}
              />
            )}
          </li>
          {/* Dropdown Quốc gia */}
          <li
            className="dropdown"
            onMouseEnter={() => setIsDropdownVisible(true)}
            onMouseLeave={() => setIsDropdownVisible(false)}
          >
            <a className={isDropdownActive("nation") ? "active" : ""}>
              Quốc gia
            </a>

            {isDropdownVisible && (
              <DropdownMenu
                apiEndpoint={`${process.env.REACT_APP_API_URL}/api/core/nations/`}
                type="nation"
                onClose={() => {
                  setIsDropdownVisible(false);
                }}
              />
            )}
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/newsScrip");
              }}
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
                  setClickUser(!clickUser);
                  event.stopPropagation();
                }}
              >
                <img
                  src={
                    avt
                      ? process.env.REACT_APP_API_URL + avt
                      : `${process.env.REACT_APP_API_URL}/static_sv/assets/img/defaultImgUser.png`
                  }
                  alt="Avatar"
                ></img>

                <ul style={{ display: clickUser ? "flex" : "none" }}>
                  <li style={{ borderBottom: "gray solid 1px" }}>
                    <a
                      onClick={() => {
                        navigate("/profile");
                        setClickUser(false);
                      }}
                    >
                      <i className="fa-solid fa-user-edit"></i> Chỉnh sửa thông
                      tin
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        navigate("/settings");
                        setClickUser(false);
                      }}
                    >
                      <i className="fa-solid fa-cog"></i> Tài khoản và cài đặt
                    </a>
                  </li>
                  <li
                    onClick={() => {
                      handleLogout();
                      setClickUser(false);
                    }}
                  >
                    <a>
                      <i className="fa-solid fa-sign-out-alt"></i> Đăng xuất
                    </a>
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
