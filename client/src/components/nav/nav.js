import React, {useState, useEffect} from "react";
import "./nav.scss";
import {useNavigate} from "react-router-dom";
import movieAPI from "../../services/movieAPI";
import DropdownMenu from "../dropdownMenu/DropdownMenu";

function Nav() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [avt, setImg] = useState(null);
    const [login, setLogin] = useState(false);
    const [suggestSearch, setSuggest] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
    };
    useEffect(() => {
        setLogin(JSON.parse(localStorage.getItem("user"))?.login || false);
        setImg(JSON.parse(localStorage.getItem("user"))?.url_avt || null);
    }, [navigate]);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchkey = (event) => {
        const value = event.target.value;

        const getsuggest = async () => {
            try {
                const result = await movieAPI.getSearch(value);
                setSuggest(result);
                console.log(value);
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        };
        // if (!suggestSearch) {
        //     getsuggest()
        // }
        // if (suggestSearch) {
        //     if (suggestSearch.movie !== undefined && value !== '') {
        //         getsuggest()
        //     }
        // }
        if (value) {
            getsuggest();
        }
    };

    const handleSearchBlur = (input) => {
        input.style.width = "0px";
        input.style.padding = "0px";
        document.getElementById("suggestSearch").style.display = "none";
        document.getElementById("look").style.color = "#fff";
    };

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
                localStorage.setItem("user", JSON.stringify({login: false}));
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
    return (
        <div id="header">
            <div id="main_content_header">
                <div id="min_menu">
                    <a style={{marginLeft: 10, marginRight: 10}} onClick={handleMenuToggle}>
                        <i className="fa-solid fa-bars" style={{display: showMenu ? "none" : "flex", marginLeft: 15}}></i>
                        <i className="fa-solid fa-x" style={{display: showMenu ? "flex" : "none", marginLeft: 15}}></i>
                    </a>
                    {
                        <ul
                            style={{
                                transform: showMenu ? "translateX(150px)" : "translateX(-150px)",
                            }}
                        >
                            <li>
                                <a
                                    onClick={() => {
                                        navigate("/TrangChu");
                                    }}
                                    target="main"
                                    rel="noopener noreferrer"
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
                    style={{width: "9%", height: "auto", cursor: "pointer"}}
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
                        >
                            Trang chủ
                            {/* <div className="tick" style={{ display: 'flex' }}></div> */}
                        </a>
                    </li>
                    {/* Dropdown Thể loại */}
                    <li className="dropdown" onMouseEnter={() => setIsDropdownVisible(true)} onMouseLeave={() => setIsDropdownVisible(false)}>
                        <a target="main" rel="noopener noreferrer">
                            Thể loại
                        </a>

                        {isDropdownVisible && <DropdownMenu apiEndpoint={`${process.env.REACT_APP_API_URL}/api/core/genres/`} type="genre" onClose={() => setIsDropdownVisible(false)} />}
                    </li>
                    {/* Dropdown Quốc gia */}
                    <li className="dropdown" onMouseEnter={() => setIsDropdownVisible(true)} onMouseLeave={() => setIsDropdownVisible(false)}>
                        <a target="main" rel="noopener noreferrer">
                            Quốc gia
                        </a>

                        {isDropdownVisible && <DropdownMenu apiEndpoint={`${process.env.REACT_APP_API_URL}/api/core/nations/`} type="country" onClose={() => setIsDropdownVisible(false)} />}
                    </li>
                    <li>
                        <a
                            onClick={() => {
                                navigate("/newsScrip");
                            }}
                            target="main"
                            rel="noopener noreferrer"
                        >
                            tin tức
                            {/* <div className="tick"></div> */}
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => {
                                navigate("/Intro");
                            }}
                            target="main"
                            rel="noopener noreferrer"
                        >
                            Giới thiệu
                            {/* <div className="tick"></div> */}
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => {
                                navigate("/mylist");
                            }}
                            target="main"
                            rel="noopener noreferrer"
                        >
                            Danh sách của tôi
                            {/* <div className="tick"></div> */}
                        </a>
                    </li>
                </ul>
                <ul id="ul_right">
                    <li
                        style={{
                            width: "auto",
                            justifyContent: "end",
                            position: "relative",
                        }}
                    >
                        <a
                            onClick={(event) => {
                                handleSearch(event.currentTarget);
                            }}
                            id="look"
                            target="main"
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <div id="search_list"></div>
                        </a>
                        <input
                            type="text"
                            id="search"
                            placeholder="ex: tên phim"
                            value={searchValue}
                            onChange={handleSearchChange}
                            onKeyUp={handleSearchkey}
                            onBlur={(event) => {
                                handleSearchBlur(event.currentTarget);
                            }}
                        />
                        <div id="suggestSearch">
                            {suggestSearch ? (
                                suggestSearch.map((item, index) => (
                                    <span>
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                        {" " + item}
                                    </span>
                                ))
                            ) : (
                                <></>
                            )}
                        </div>
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
                                <img src={avt ? avt : `${process.env.REACT_APP_API_URL}/static_sv/assets/img/defaultImgUser.png`}></img>

                                <ul style={{display: clickUser ? "flex" : "none"}}>
                                    <li style={{borderBottom: "gray solid 1px"}}>
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
