import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Lưu trữ token
const storeTokens = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
};

// Xóa token
const removeTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

const checkRefreshToken = async (navigate) => {

    try {
        const response = await fetch('http://localhost:8000/service/api/token/refresh/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: localStorage.getItem('refreshToken') }),
        });

        const result = await response.json();

        if (response.ok && result.access && result.refresh) {
            storeTokens(result.access, result.refresh);
            return true;
        } else {
            removeTokens();
            navigate('/login')
            return false;
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        return false;
    }
};

export default checkRefreshToken;