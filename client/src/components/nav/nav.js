import React, { useState, useEffect } from 'react';
import './nav.scss';
import { useNavigate } from 'react-router-dom';
import { fetchSearch } from '../../services/movieAPI';

function Nav() {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false);
    const [searchValue, setSearchValue] = useState(null);
    const [avt, setImg] = useState(null)
    const [login, setLogin] = useState(false)
    const [suggestSearch, setSuggest] = useState(null);
    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
    };
    useEffect(() => {
        setLogin(JSON.parse(localStorage.getItem('user'))?.login || false)
        setImg(JSON.parse(localStorage.getItem('user'))?.url_avt || null)
    }, [navigate])

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);

    };


    const handleSearchkey = (event) => {
        const value = event.target.value

        const getsuggest = async () => {
            try {
                const result = await fetchSearch(value)
                setSuggest(result)
                console.log(value)
                console.log(result)

            } catch (error) {
                console.error(error)
            }
        }
        // if (!suggestSearch) {
        //     getsuggest()
        // }
        // if (suggestSearch) {
        //     if (suggestSearch.movie !== undefined && value !== '') {
        //         getsuggest()
        //     }
        // }
        if (value) {
            getsuggest()
        }

    };

    const handleSearchBlur = (input) => {
        input.style.width = '0px';
        input.style.padding = '0px';
        document.getElementById('suggestSearch').style.display = 'none'
        document.getElementById('look').style.color = '#fff'
    };


    const handleLogout = () => {


        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken')
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken}`);

        const raw = JSON.stringify({
            "refreshToken": refreshToken
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8000/service/logout/", requestOptions)
            .then((response) => response.text())
            .then(() => {
                console.log('đã logout')
                localStorage.setItem('accessToken', null)
                localStorage.setItem('refreshToken', null)
                localStorage.setItem('user', JSON.stringify({ login: false }))
                setLogin(false)
                navigate('/')
            })
            .catch((error) => console.error(error));

    }

    const handleSearch = (a) => {
        const input = a.nextElementSibling
        input.style.width = '300px'
        input.style.padding = '3px'
        a.style.color = '#000000'
        input.focus()
        document.getElementById('suggestSearch').style.display = 'flex'
    }
    const [clickUser, setClickUser] = useState(false)
    return (
        <div id='header'>
            <div id="min_menu">
                <a style={{ marginLeft: 10, marginRight: 10 }} onClick={handleMenuToggle}>
                    <i className="fa-solid fa-bars" style={{ display: showMenu ? 'none' : 'flex', marginLeft: 15 }}></i>
                    <i className="fa-solid fa-x" style={{ display: showMenu ? 'flex' : 'none', marginLeft: 15 }}></i>
                </a>
                {(
                    <ul id="min_menu" style={{ transform: showMenu ? 'translateX(150px)' : 'translateX(-150px)' }}>
                        <li>
                            <a onClick={() => { navigate('/TrangChu') }} target="main" rel="noopener noreferrer">
                                <i className="fa-solid fa-house"></i> Trang chủ
                            </a>
                        </li>
                        <li>
                            <a onClick={() => { navigate('/TrangChu') }} target="main" rel="noopener noreferrer">
                                Phim lẻ
                            </a>
                        </li>
                        <li>
                            <a onClick={() => { navigate('/TrangChu') }} target="main" rel="noopener noreferrer">
                                Mới thêm
                            </a>
                        </li>
                        <li>
                            <a onClick={() => { navigate('/TrangChu') }} target="main" rel="noopener noreferrer">
                                Danh sách của tôi
                            </a>
                        </li>
                    </ul>
                )}
            </div>

            <a onClick={() => { navigate('/TrangChu') }}>
                <img src="http://127.0.0.1:8000/static/assets//img/logo.png" alt="" />
            </a>
            <ul id="ul_left">
                <li>
                    <a onClick={() => { navigate('/TrangChu') }} target="main" rel="noopener noreferrer">
                        <i className="fa-solid fa-house"></i>
                        Trang chủ
                        <div className="tick" style={{ display: 'flex' }}></div>
                    </a>
                </li>
                <li>
                    <a onClick={() => { navigate('/TrangChu') }} target="main" rel="noopener noreferrer">
                        Phim lẻ
                        <div className="tick"></div>
                    </a>
                </li>
                <li>
                    <a onClick={() => { navigate('/TrangChu') }} target="main" rel="noopener noreferrer">
                        Mới thêm
                        <div className="tick"></div>
                    </a>
                </li>
                <li>
                    <a onClick={() => { navigate('/TrangChu') }} target="main" rel="noopener noreferrer">
                        Danh sách của tôi
                        <div className="tick"></div>
                    </a>
                </li>
            </ul>
            <ul id="ul_right">
                <li style={{ width: 'auto', justifyContent: 'end', position: 'relative' }}>
                    <a onClick={(event) => { handleSearch(event.currentTarget) }} id="look" target="main">
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
                        onBlur={(event) => { handleSearchBlur(event.currentTarget) }}
                    />
                    <div id='suggestSearch'>
                        {suggestSearch ? suggestSearch.map((item, index) => (
                            <span><i className="fa-solid fa-magnifying-glass"></i>{' ' + item}</span>
                        )) : <></>}
                    </div>
                </li>
                <li>
                    <a >
                        <i className="fa-regular fa-bell"></i>
                    </a>
                </li>
                <li>{!login ?
                    <a onClick={() => { navigate('/login') }}>
                        <i className="fa-solid fa-right-to-bracket"></i>
                    </a> :
                    <div id='login' onClick={(event) => { setClickUser(clickUser ? false : true) }}>
                        <img src={avt ? avt : 'http://127.0.0.1:8000/static/assets/img/defaultImgUser.png'}></img>

                        <ul style={{ display: clickUser ? 'flex' : 'none' }}>
                            <li style={{ borderBottom: 'gray solid 1px' }}><a >Chỉnh sửa thông tin</a></li>
                            <li><a>Tài khoản và cài đặt</a></li>
                            <li onClick={() => { handleLogout() }}><a>Đăng xuất</a></li>
                        </ul>
                    </div>}
                </li>
            </ul>
        </div>
    );
};

export default Nav;