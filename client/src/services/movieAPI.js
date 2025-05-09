import checkRefreshToken from "./token";

const movieAPI = {
  getBannerQC: async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer mybearertoken"); // Gửi token trong header

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/movies/get_banner_qc/`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  },
  getTopGenres: async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/core/get_top_genres/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  },

  getDisplayList: async (url) => {
    // sau sẽ thay url thành thể loại ...
    try {
      const response = await fetch(url, {
        method: "GET",
        redirect: "follow",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  },
  getDisplayListByGenre10: async (genre_id) => {
    // sau sẽ thay url thành thể loại ...
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/movies/get_films_by_genre10/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            genre_id: genre_id,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  },
  getFilmData: async (id, navigate, retry = false) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log("Fetching data for movie ID:", id);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/movies/get_movie_details/${id}/`,
        {
          method: "GET",
        }
      );

      console.log("Response status:", response.status);
      if (response.ok) {
        const result = await response.json();
        if (!result) {
          console.log("No result found for movie ID:", id);
          return;
        }
        result.release_date = new Date(result.release_date);
        result.release_date = `${result.release_date.getDate()}/${result.release_date.getMonth() + 1
          }/${result.release_date.getFullYear()}`;
        console.log("Movie data:", result);
        return result;
      } else if (response.status === 401 && !retry) {
        console.log("Unauthorized access, attempting to refresh token...");
        const refreshSuccess = await checkRefreshToken(navigate);
        if (refreshSuccess) {
          console.log("Token refreshed successfully, retrying fetch...");
          return movieAPI.getFilmData(id, navigate, true);
        } else {
          console.error("Failed to refresh token");
        }
      } else {
        console.error(
          "Failed to fetch film data, status code:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching film data:", error);
    }
  },
  getVideoData: async (id1, id2, navigate, retry = false) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/movies/${id1}/episodes/${id2}/`;
      console.log("Calling API1:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        console.error("API Error:", response.status);
        if (response.status === 401 && !retry) {
          const refreshSuccess = await checkRefreshToken(navigate);
          if (refreshSuccess) {
            const result = await movieAPI.getVideoData(id1, id2, navigate);
          }
        }
        return null;
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching film data:", error);
      return null;
    }
  },
  getFirstEpisode: async (movieId, navigate) => {
    try {
      // Gọi API để lấy thông tin phim và danh sách tập
      const response = await movieAPI.getFilmData(movieId, navigate);

      if (response && response.episodes && response.episodes.length > 0) {
        const firstEpisodeId = response.episodes[0].episode_id; // Lấy episode_id của tập đầu tiên

        // Gọi API để lấy dữ liệu chi tiết của tập đầu tiên
        const firstEpisodeData = await movieAPI.getVideoData(
          movieId,
          firstEpisodeId,
          navigate
        );

        return firstEpisodeData; // Trả về thông tin tập đầu tiên
      }

      return null; // Trả về null nếu không có tập nào
    } catch (error) {
      console.error("Lỗi khi lấy tập đầu tiên:", error);
      return null;
    }
  },
  getFirstEpisodeBanner: async (navigate, clickedBannerId) => {
    try {
      const bannerQC = await movieAPI.getBannerQC();
      console.log("📌 Danh sách phim QC:", bannerQC);

      if (!bannerQC || !Array.isArray(bannerQC) || bannerQC.length === 0) {
        console.error("❌ Không có phim QC nào.");
        return null;
      }

      console.log("✅ ID banner được click:", clickedBannerId);
      const selectedMovie = bannerQC.find(
        (movie) => String(movie.movie_id) === String(clickedBannerId)
      );

      if (!selectedMovie || !selectedMovie.movie_id) {
        console.error("❌ Không tìm thấy phim với ID:", clickedBannerId);
        return null;
      }

      const movieId = selectedMovie.movie_id;
      console.log("✅ ID phim được chọn:", movieId);

      // 🔹 Gọi API để lấy danh sách tập phim
      const movieEpisodes = await movieAPI.getFilmData(movieId, navigate);

      if (!movieEpisodes || !movieEpisodes.episodes?.length) {
        console.error("❌ Không tìm thấy danh sách tập phim!");
        return null;
      }

      const firstEpisodeId = movieEpisodes.episodes[0]?.episode_id;
      if (!firstEpisodeId) {
        console.error("❌ Không tìm thấy tập đầu tiên!");
        return null;
      }

      console.log("🎬 ID tập đầu tiên:", firstEpisodeId);

      // 🔹 Gọi API để lấy dữ liệu chi tiết của tập đầu tiên
      const firstEpisodeData = await movieAPI.getVideoData(
        movieId,
        firstEpisodeId,
        navigate
      );

      if (!firstEpisodeData || !firstEpisodeData.current_episode) {
        console.error(
          "❌ Không lấy được dữ liệu tập đầu tiên hoặc dữ liệu bị thiếu."
        );
        return null;
      }

      console.log("🎬 Dữ liệu tập đầu tiên trả về:", firstEpisodeData);
      return {
        ...firstEpisodeData,
        movie_id: movieId, // Đảm bảo movie_id có trong dữ liệu trả về
      };
    } catch (error) {
      console.error("❌ Lỗi khi lấy tập đầu tiên:", error);
      return null;
    }
  },

  getSearch: async (value) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        keys: value,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/movies/searchkeys/`,
        requestOptions
      );
      if (response.ok) {
        const result = await response.json();
        return result["movies"];
      } else {
        return;
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export default movieAPI;
