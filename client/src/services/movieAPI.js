import checkRefreshToken from "./token";


export const fetchBannerQC = async () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer mybearertoken"); // Gửi token trong header

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch('http://127.0.0.1:8000/service/get_banner_qc/', requestOptions)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}

export const fetchDisplayList = async (url) => { // sau sẽ thay url thành thể loại ...
    try {
        const response = await fetch(url, {
            method: 'GET',
            redirect: 'follow',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};


export const fetchDisplayListByGenre10 = async (genre) => { // sau sẽ thay url thành thể loại ...
    try {
        const response = await fetch('http://127.0.0.1:8000/service/get_films_by_genre10/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "genre": genre,
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};


export const fetchFilmData = async (id, navigate, retry = false) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        console.log('Fetching data for movie ID:', id);

        const response = await fetch(`http://localhost:8000/service/detailMovie/`, {
            method: 'POST', // Sử dụng phương thức POST theo yêu cầu của API
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                "movie_id": id
            })
        });
        console.log('Response status:', response.status);
        if (response.ok) {
            const result = await response.json();
            if (result.length === 0) {
                console.log('No result found for movie ID:', id);
                return;
            } else {
                result.release_date = new Date(result.release_date);
                result.release_date = `${result.release_date.getDate()}/${result.release_date.getMonth() + 1}/${result.release_date.getFullYear()}`;
                console.log('Movie data:', result);
                return result;
            }
        } else if (response.status === 401 && !retry) {
            console.log('Unauthorized access, attempting to refresh token...');
            // Token có thể đã hết hạn, thử làm mới token
            const refreshSuccess = await checkRefreshToken(navigate);
            if (refreshSuccess) {
                console.log('Token refreshed successfully, retrying fetch...');
                return fetchFilmData(id, navigate, true);
            } else {
                console.error('Failed to refresh token');
            }
        } else {
            console.error('Failed to fetch film data, status code:', response.status);
        }
    } catch (error) {
        console.error('Error fetching film data:', error);
    }
};


export const fetchVideoData = async (id1, id2, navigate, retry = false) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`http://localhost:8000/service/film/`, { // Use template literal
            method: 'POST', // Use GET request to fetch film details
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                "movie_id": id1,
                "episode_num": id2
            })
        });

        if (response.ok) {
            const result = await response.json();
            if (result.length === 0) {
                console.error('Movie has not been updated yet!')

            } else {

                return (result);

            }

        } else if (response.status === 401 && !retry) {
            // Token might be expired, try refreshing
            const refreshSuccess = await checkRefreshToken(navigate); // Use the utility function
            if (refreshSuccess) {
                return await fetchVideoData(id1, id2, navigate, true);
            }
        } else {
            console.error('Movie has not been updated yet!');
        }

    } catch (error) {
        console.error('Network error occurred.');
        console.error('Error fetching film data:', error);
    }
};

export const fetchSearch = async (value) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "keys": value
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch("http://localhost:8000/service/searchkeys/", requestOptions)
        if (response.ok) {
            const result = await response.json();
            return result['movies']
        } else {
            return
        }
    } catch (error) {
        console.error(error)
    }

}