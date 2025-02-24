export const API_GENRES_HOT = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/movies/get_genres_hot/`, {
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