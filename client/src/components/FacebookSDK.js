import { useEffect } from 'react';

const FacebookSDK = () => {
    useEffect(() => {
        // Tải script Facebook SDK một cách động
        const script = document.createElement('script');
        script.src = `https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v17.0&appId=YOUR_FACEBOOK_APP_ID&autoLogAppEvents=1`;
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';
        script.nonce = 'YOUR_NONCE'; // Thêm nonce nếu cần
        document.head.appendChild(script);

        // Khởi tạo SDK sau khi script được tải
        script.onload = () => {
            window.fbAsyncInit = function () {
                window.FB.init({
                    appId: '370600639113748',
                    cookie: true,
                    xfbml: true,
                    version: 'v17.0',
                });
            };
        };
    }, []);

    return null; // Component này không render gì cả
};

export default FacebookSDK;