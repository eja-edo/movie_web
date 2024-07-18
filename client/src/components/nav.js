import React, { useState } from 'react';
import '../styles/nav.scss';


function Nav() {
    const [showMenu, setShowMenu] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleMenuToggle = () => {
        setShowMenu(!showMenu);

    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchFocus = () => {
        // Logic for displaying search suggestions
    };

    const handleSearchBlur = () => {
        // Logic for hiding search suggestions
    };

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
                            <a href="/TrangChu" target="main" rel="noopener noreferrer">
                                <i className="fa-solid fa-house"></i> Trang chủ
                            </a>
                        </li>
                        <li>
                            <a href="phimle.html" target="main" rel="noopener noreferrer">
                                Phim lẻ
                            </a>
                        </li>
                        <li>
                            <a href="phimhot.html" target="main" rel="noopener noreferrer">
                                Mới thêm
                            </a>
                        </li>
                        <li>
                            <a href="ds_cuatoi.html" target="main" rel="noopener noreferrer">
                                Danh sách của tôi
                            </a>
                        </li>
                    </ul>
                )}
            </div>

            <a href="">
                <img src="http://127.0.0.1:8000/static/assets//img/logo.png" alt="" />
            </a>
            <ul id="ul_left">
                <li>
                    <a href="/TrangChu" target="main" rel="noopener noreferrer">
                        <i className="fa-solid fa-house"></i> Trang chủ <div className="tick" style={{ display: 'flex' }}></div>
                    </a>
                </li>
                <li>
                    <a href="phimle.html" target="main" rel="noopener noreferrer">
                        Phim lẻ <div className="tick"></div>
                    </a>
                </li>
                <li>
                    <a href="phimhot.html" target="main" rel="noopener noreferrer">
                        Mới thêm
                        <div className="tick"></div>
                    </a>
                </li>
                <li>
                    <a href="ds_cuatoi.html" target="main" rel="noopener noreferrer">
                        Danh sách của tôi
                        <div className="tick"></div>
                    </a>
                </li>
            </ul>
            <ul id="ul_right">
                <li style={{ width: 'auto', justifyContent: 'end', position: 'relative' }}>
                    <a onClick={() => { }} id="look" style={{ zIndex: 2, marginRight: 16 }} target="main">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <div id="search_list"></div>
                    </a>
                    <input
                        type="text"
                        id="search"
                        placeholder="ex: tên phim"
                        value={searchValue}
                        onChange={handleSearchChange}
                        onFocus={handleSearchFocus}
                        onBlur={handleSearchBlur}
                    />
                </li>
                <li>
                    <a href="">
                        <i className="fa-regular fa-bell"></i>
                    </a>
                </li>
                <li>
                    <a href="/login">
                        <i className="fa-solid fa-right-to-bracket"></i>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Nav;