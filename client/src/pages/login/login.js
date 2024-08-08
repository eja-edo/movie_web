import React, { useState, useEffect } from 'react';
import './login.scss'; // Import file CSS của bạn
import { useNavigate } from 'react-router-dom'
function Login() {
    const [login, setLogin] = useState(false)
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

        fetch("http://localhost:8000/user/login/", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result && result.access && result.refresh) {
                    localStorage.setItem('accessToken', result.access);
                    localStorage.setItem('refreshToken', result.refresh);
                    setLogin(true)
                }
                else {
                    console.error("cannot get api")
                }
            })
            .catch((error) => console.error(error));
        console.log(`${formName} với ${formData.username}`);
    };


    const handleFacebookLogin = () => {
        window.FB.login(
            (response) => {
                if (response.authResponse) {
                    // Đăng nhập thành công
                    console.log(response)
                    fetch('http://localhost:8000/user/facebook/login/token/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ accessToken: response.authResponse.accessToken }),
                    })
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            }
                            else {
                                console.error('error!')
                            }
                        })
                        .then(data => {
                            console.log(data);
                            // Xử lý response từ backend (lưu token, ...)
                            localStorage.setItem('accessToken', data.access);
                            localStorage.setItem('refreshToken', data.refresh);
                            setLogin(true)
                        })
                        .catch(error => console.error('Lỗi:', error));
                } else {
                    // Người dùng không cho phép hoặc có lỗi xảy ra
                    console.log('Đăng nhập thất bại!');
                }
            },
            // { scope: 'email' }
        );
    };

    useEffect(() => {
        if (login) {
            const fetchinfouser = async () => {
                try {
                    const accessToken = localStorage.getItem('accessToken');
                    const response = await fetch(`http://localhost:8000/user/getDetail/`, { // Use template literal
                        method: 'GET', // Use GET request to fetch film details
                        headers: {
                            "Authorization": `Bearer ${accessToken}`,
                        },
                        redirect: "follow"
                    });

                    if (response.ok) {
                        const result = await response.json();
                        const safeUserData = {
                            userId: result.id,
                            username: result.username,
                            email: result.email,
                            url_avt: result.url_avt,
                            login: true
                        };
                        localStorage.setItem('user', JSON.stringify(safeUserData))
                        navigate(-1)


                    } else if (response.status === 401) {
                        console.error('error');
                    }

                } catch (error) {

                    console.error('Error fetching :', error);
                }
            };
            fetchinfouser();
        }
    }, [login])

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmitSignUp = async (e) => {
        e.preventDefault();
        const requestData = {
            username,
            email,
            password1,
            password2,
        };

        try {
            const response = await fetch('http://localhost:8000/user/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error('Có lỗi xảy ra.');
            }

            const data = await response.json();
            console.log(data)
            const { access, refresh } = data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            setMessage('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.');
        } catch (error) {
            setMessage('Có lỗi xảy ra. Vui lòng thử lại.');
        }
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
                        <a className="social-button google" onClick={handleFacebookLogin}>
                            <i className="fab fa-facebook"></i>
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
                <form onSubmit={handleSubmitSignUp}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                    />
                    <button type="submit">Đăng ký</button>
                </form>
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