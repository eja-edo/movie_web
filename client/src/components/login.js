import React, { useState } from 'react';
import '../styles/login.scss'; // Import file CSS của bạn
import { storeTokens } from './token';
import { useNavigate } from 'react-router-dom'
function Login() {

    const navigate = useNavigate()

    const [activeForm, setActiveForm] = useState('login');

    const [formData, setFormData] = useState({
        username: '',
        email: '',
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };
    const handleFormSwitch = (formName) => {
        setActiveForm(formName);
    };

    const handleSubmit = (event, formName) => {
        event.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "username": formData.username,
            "password": formData.password
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8000/service/login/", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result && result.access && result.refresh) {
                    localStorage.setItem('accessToken', result.access);
                    localStorage.setItem('refreshToken', result.refresh);
                    navigate('/TrangChu')
                }
                else {
                    console.error("cannot get api")
                }
            })
            .catch((error) => console.error(error));
        console.log(`${formName} với ${formData.username}`);
    };
    return (
        <div className="container_login">
            <div id="login-form" style={{ display: activeForm === 'login' ? 'block' : 'none' }}>
                <h2 className="heading">Đăng nhập</h2>
                <form className="form" onSubmit={(e) => handleSubmit(e, 'login')}>
                    <input type="text" className="input" placeholder="Username" id="username" name="username" required onChange={handleChange} />
                    <input type="password" className="input" placeholder="Password" id="password" name="password" required onChange={handleChange} />
                    <span className="forgot-password">
                        <button type="button" onClick={() => handleFormSwitch('forgotPassword')}>Quên mật khẩu?</button>
                    </span>
                    <button type="submit" className="login-button">
                        Đăng nhập
                    </button>
                </form>
                <div className="social-account-container">
                    <span className="title">Hoặc đăng nhập bằng</span>
                    <div className="social-accounts">
                        <a href="https://accounts.google.com/signin" className="social-button google">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="https://appleid.apple.com/signin" className="social-button apple">
                            <i className="fab fa-apple"></i>
                        </a>
                        <a href="https://twitter.com/login" className="social-button twitter">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>
                <p className="sign-up-label">
                    Bạn chưa có tài khoản?{' '}
                    <span>
                        <button type="button" onClick={() => handleFormSwitch('signup')}>Đăng ký</button>
                    </span>
                </p>
            </div>

            {/* Signup Form */}
            <div id="signup-form" style={{ display: activeForm === 'signup' ? 'block' : 'none' }}>
                <h2 className="heading">Đăng ký tài khoản</h2>
                {/* ... Form content */}
                <button type="button" onClick={() => handleFormSwitch('login')}>Đăng nhập</button>
                {/* ... Other content */}
            </div>

            {/* Forgot Password Form */}
            <div id="forgot-password-form" style={{ display: activeForm === 'forgotPassword' ? 'block' : 'none' }}>
                <h2 className="heading">Quên mật khẩu</h2>
                {/* ... Form content */}
                <button type="button" onClick={() => handleFormSwitch('login')}>Đăng nhập</button>
                {/* ... Other content */}
            </div>
        </div>
    );
}

export default Login;