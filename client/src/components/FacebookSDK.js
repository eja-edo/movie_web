import { useEffect } from 'react';

const FacebookSDK = () => {
    useEffect(() => {
        // Check if script is already loaded
        if (document.getElementById('facebook-jssdk')) return;
        if (window.FB) return;

        // Load Facebook SDK dynamically
        const script = document.createElement('script');
        script.id = 'facebook-jssdk';
        script.src = `https://connect.facebook.net/vi_VN/sdk.js`;
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';
        // script.nonce = 'YOUR_NONCE'; // Uncomment if using CSP

        // Initialize after load
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: process.env.REACT_APP_FACEBOOK_APP_ID || 'YOUR_FACEBOOK_APP_ID',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v22.0'
            });
        };

        document.head.appendChild(script);

        // Cleanup
        return () => {
            if (document.getElementById('facebook-jssdk')) {
                document.head.removeChild(script);
            }
            delete window.FB;
            delete window.fbAsyncInit;
        };
    }, []);

    return null;
};

export default FacebookSDK;