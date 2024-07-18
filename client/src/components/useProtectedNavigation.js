// import { useState, useCallback, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTokenValidation } from './token';

// export function useProtectedNavigation() {
//     const navigate = useNavigate();
//     const isValidToken = useTokenValidation(); // Gọi useTokenValidation ở đây
//     const [isLoadingToken, setIsLoadingToken] = useState(true);

//     useEffect(() => {
//         // Kiểm tra khi component mount và khi isValidToken thay đổi
//         if (isValidToken !== null) { // Đã có kết quả kiểm tra token
//             setIsLoadingToken(false); // Đánh dấu đã tải xong
//         }
//     }, [isValidToken]);
//     const checkTokenAndNavigate = useCallback(
//         async (filmId) => {
//             if (isValidToken) {
//                 navigate(`/film/:${filmId}`);
//             } else {
//                 navigate('/login');
//             }
//         },
//         [isValidToken, navigate]
//     );
//     if (isLoadingToken) {
//         return <div>Đang kiểm tra token...</div>;
//     }

//     return checkTokenAndNavigate;
// }