import React, {useState, useEffect} from "react";
import "./login.scss"; // Import file CSS của bạn
import {useNavigate} from "react-router-dom";

function Login() {
    document.documentElement.style.setProperty("--api-url", process.env.REACT_APP_API_URL);

    const [login, setLogin] = useState(false);
    const navigate = useNavigate();
    const [activeForm, setActiveForm] = useState("login");
    const [formData, setFormData] = useState({
        username_or_email: "",
        password: "",
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
            username_or_email: formData.username_or_email,
            password: formData.password,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(`${process.env.REACT_APP_API_URL}/api/user/login/`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(`${formName} với ${formData.username_or_email}`);
                if (result && result.access && result.refresh) {
                    localStorage.setItem("accessToken", result.access);
                    localStorage.setItem("refreshToken", result.refresh);
                    setLogin(true);
                } else {
                    setMessage("Đăng nhập thất bại! Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.");
                }
            })
            .catch((error) => console.error(error));
    };

    const handleFacebookLogin = () => {
        window.FB.login(
            (response) => {
                if (response.authResponse) {
                    // Đăng nhập thành công
                    console.log(response);
                    fetch(`${process.env.REACT_APP_API_URL}/api/user/facebook/login/token/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            accessToken: response.authResponse.accessToken,
                        }),
                    })
                        .then((response) => {
                            if (response.ok) {
                                return response.json();
                            } else {
                                console.error("error!");
                            }
                        })
                        .then((data) => {
                            console.log(data);
                            // Xử lý response từ backend (lưu token, ...)
                            localStorage.setItem("accessToken", data.access);
                            localStorage.setItem("refreshToken", data.refresh);
                            setLogin(true);
                        })
                        .catch((error) => console.error("Lỗi:", error));
                } else {
                    // Người dùng không cho phép hoặc có lỗi xảy ra
                    console.log("Đăng nhập thất bại!");
                }
            }
            // { scope: 'email' }
        );
    };

    useEffect(() => {
        if (login) {
            const fetchinfouser = async () => {
                try {
                    const accessToken = localStorage.getItem("accessToken");
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/getDetail/`, {
                        // Use template literal
                        method: "GET", // Use GET request to fetch film details
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        redirect: "follow",
                    });

                    if (response.ok) {
                        const result = await response.json();
                        const safeUserData = {
                            username: result.username,
                            img_url: result.img_url,
                            login: true,
                        };
                        localStorage.setItem("user", JSON.stringify(safeUserData));
                        navigate(-1);
                        console.log("Đăng nhập thành công!");
                    } else if (response.status === 401) {
                        console.error("error");
                    }
                } catch (error) {
                    console.error("Error fetching :", error);
                }
            };
            fetchinfouser();
        }
    }, [login]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [message, setMessage] = useState("");
    const [verificationStatus, setVerificationStatus] = useState("");
    const [websocket, setWebsocket] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const connectWebSocket = (uid, token) => {
        const ws = new WebSocket(`ws://localhost:8000/ws/email-verification/${uid}/?token=${token}`);

        ws.onopen = () => {
            console.log("WebSocket connected");
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "email_verified") {
                setVerificationStatus("Xác nhận email thành công!");
                // Đóng WebSocket sau khi nhận được xác nhận
                ws.close();
                // Chuyển người dùng về trang đăng nhập
                setTimeout(() => {
                    handleFormSwitch("login");
                }, 2000);
            }
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected");
        };

        setWebsocket(ws);
    };

    // Cleanup WebSocket khi component unmount
    useEffect(() => {
        return () => {
            if (websocket) {
                websocket.close();
            }
        };
    }, [websocket]);

    const handleSubmitSignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Bắt đầu loading
        setMessage(""); // Reset message

        // Kiểm tra từng trường dữ liệu, chỉ lấy lỗi đầu tiên
        const fields = ["username", "email", "password1", "password2"];
        for (let field of fields) {
            let error = validateInput(field, eval(field)); // Kiểm tra lỗi
            if (error) {
                setMessage(error); // Chỉ lấy lỗi đầu tiên
                setIsLoading(false);
                return;
            }
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            username: username,
            password: password1,
            email: email,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/register/`, requestOptions);
            const data = await response.json();

            if (response.ok) {
                // Lưu tokens vào localStorage
                localStorage.setItem("accessToken", data.access);
                localStorage.setItem("refreshToken", data.refresh);

                // Kết nối WebSocket để theo dõi xác nhận email
                connectWebSocket(data.uid, data.access);

                setMessage("Vui lòng kiểm tra email của bạn để xác nhận tài khoản!");
                handleFormSwitch("emailVarification");
            } else {
                throw new Error(data.message || "Có lỗi xảy ra khi đăng ký");
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setIsLoading(false); // Kết thúc loading bất kể thành công hay thất bại
        }
    };

    const validateInput = (name, value) => {
        switch (name) {
            case "username":
                if (!value) return "Vui lòng nhập tên đăng nhập";
                if (value.length < 8) return "Tên đăng nhập phải có ít nhất 8 ký tự";
                if (value.length > 20) return "Tên đăng nhập không được quá 20 ký tự";
                if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới";
                return "";
            case "email":
                if (!value) return "Vui lòng nhập email";
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email phải có dạng abc@gmail.com";
                return "";
            case "password":
            case "password1":
                if (!value) return "Vui lòng nhập mật khẩu";
                if (value.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự";
                if (!/(?=.*[a-z])/.test(value)) return "Mật khẩu phải chứa ít nhất 1 chữ thường";
                if (!/(?=.*[A-Z])/.test(value)) return "Mật khẩu phải chứa ít nhất 1 chữ hoa";
                if (!/(?=.*\d)/.test(value)) return "Mật khẩu phải chứa ít nhất 1 số";
                if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(value)) return "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt";
                return "";
            case "password2":
                if (!value) return "Vui lòng nhập lại mật khẩu";
                if (value !== password1) return "Mật khẩu không khớp";
                return "";
            default:
                return "";
        }
    };

    const handleKeyDown = (e, inputName, nextInputId) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const error = validateInput(inputName, e.target.value);
            if (error) {
                setMessage(error);
                return;
            }
            setMessage("");

            // Nếu là input cuối cùng thì submit form
            if (!nextInputId) {
                if (activeForm === "login") {
                    handleSubmit(e, "login");
                } else {
                    handleSubmitSignUp(e);
                }
                return;
            }

            // Focus vào input tiếp theo
            const nextInput = document.getElementById(nextInputId);
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    return (
        <div id="loginbg">
            <div className="container_login">
                <div id="login-form" style={{display: activeForm === "login" ? "block" : "none"}}>
                    <h2 className="heading" style={{fontFamily: "Poppins"}}>
                        Đăng nhập
                    </h2>
                    {message && <div className="message-alert">{message}</div>}
                    <form className="form" onSubmit={(e) => handleSubmit(e, "login")}>
                        <input
                            type="text"
                            className={`input ${message && message.includes("tên đăng nhập") ? "error" : ""}`}
                            placeholder="Tên đăng nhập hoặc email"
                            id="username_or_email"
                            name="username_or_email"
                            //required
                            onChange={(e) => {
                                handleChange(e);
                                setMessage("");
                            }}
                            onKeyDown={(e) => handleKeyDown(e, "username_or_email", "password")}
                            style={{fontFamily: "Poppins"}}
                        />
                        <input
                            type="password"
                            className={`input ${message && message.includes("mật khẩu") ? "error" : ""}`}
                            placeholder="mật khẩu"
                            id="password"
                            name="password"
                            //required
                            onChange={(e) => {
                                handleChange(e);
                                setMessage("");
                            }}
                            onKeyDown={(e) => handleKeyDown(e, "password", null)}
                            style={{fontFamily: "Poppins"}}
                        />
                        <span className="forgot-password">
                            <a type="button" onClick={() => handleFormSwitch("forgotPassword")} style={{fontFamily: "Poppins"}}>
                                Quên mật khẩu?
                            </a>
                        </span>
                        <button type="submit" className="login-button" style={{fontFamily: "Poppins"}}>
                            Đăng nhập
                        </button>
                    </form>
                    <div className="social-account-container">
                        <span className="title" style={{fontFamily: "Poppins"}}>
                            Hoặc đăng nhập bằng
                        </span>
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
                    <p className="sign-up-label" style={{fontFamily: "Poppins", marginTop: "5%"}}>
                        Bạn chưa có tài khoản?{" "}
                        <span>
                            <button type="button" className="signup-button" onClick={() => handleFormSwitch("signup")}>
                                Đăng ký
                            </button>
                        </span>
                    </p>
                </div>

                {/* Signup Form */}
                <div id="signup-form" style={{display: activeForm === "signup" ? "block" : "none"}}>
                    <h2 className="heading" style={{fontFamily: "Poppins"}}>
                        Đăng ký tài khoản
                    </h2>
                    {message && <div className={`message-alert ${verificationStatus ? "success" : ""}`}>{message}</div>}
                    {verificationStatus && <div className="message-alert success">{verificationStatus}</div>}
                    <form onSubmit={handleSubmitSignUp}>
                        <input
                            className={`input-su ${message && message.includes("tên đăng nhập") ? "error" : ""}`}
                            type="text"
                            placeholder="Tên đăng nhập"
                            id="signup-username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setMessage("");
                            }}
                            onKeyDown={(e) => handleKeyDown(e, "username", "signup-email")}
                            //required
                        />
                        <input
                            className={`input-su ${message && message.includes("email") ? "error" : ""}`}
                            type="text"
                            placeholder="Email"
                            id="signup-email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setMessage("");
                            }}
                            onKeyDown={(e) => handleKeyDown(e, "email", "signup-password1")}
                            //required
                        />
                        <input
                            className={`input-su ${message && message.includes("mật khẩu") && !message.includes("lại") ? "error" : ""}`}
                            type="password"
                            placeholder="Mật khẩu"
                            id="signup-password1"
                            value={password1}
                            onChange={(e) => {
                                setPassword1(e.target.value);
                                setMessage("");
                            }}
                            onKeyDown={(e) => handleKeyDown(e, "password1", "signup-password2")}
                            //required
                        />
                        <input
                            className={`input-su ${message && message.includes("không khớp") ? "error" : ""}`}
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            id="signup-password2"
                            value={password2}
                            onChange={(e) => {
                                setPassword2(e.target.value);
                                setMessage("");
                            }}
                            onKeyDown={(e) => handleKeyDown(e, "password2", null)}
                            //required
                        />
                        <button id="su-dk" type="submit" disabled={isLoading} className={isLoading ? "loading" : ""}>
                            {isLoading ? (
                                <span className="loading-text">
                                    <span className="loading-spinner"></span>
                                    Đang xử lý...
                                </span>
                            ) : (
                                "Đăng ký"
                            )}
                        </button>
                    </form>
                    <button id="su-dn" type="button" onClick={() => handleFormSwitch("login")}>
                        Quay lại trang đăng nhập
                    </button>
                </div>

                {/*Email Verification Form */}
                <div
                    id="email-varification-form"
                    style={{
                        display: activeForm === "emailVarification" ? "block" : "none",
                    }}
                >
                    {message && <div className={`message-alert ${verificationStatus ? "success" : ""}`}>{message}</div>}
                    {verificationStatus && <div className="message-alert success">{verificationStatus}</div>}
                    <button type="button">Để sau!</button>
                </div>

                {/* Forgot Password Form */}
                <div
                    id="forgot-password-form"
                    style={{
                        display: activeForm === "forgotPassword" ? "block" : "none",
                    }}
                >
                    <h2 className="heading">Quên mật khẩu</h2>
                    <button type="button" onClick={() => handleFormSwitch("login")}>
                        Đăng nhập
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
