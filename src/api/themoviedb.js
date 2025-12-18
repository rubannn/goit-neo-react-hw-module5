import axios from "axios";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const NO_IMAGE_URL = "/public/no-img.jpg";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

const fetchData = async (url, config = {}) => {
  const response = await axiosInstance.get(url, config);
  return response.data;
};

export const getImagePath = (path, width = 300) =>
  path ? `${IMAGE_BASE_URL}w${width}${path}` : NO_IMAGE_URL;

export const getTrendingMovies = () =>
  fetchData("/trending/movie/day?language=en-US");

export const getMovieDetails = (id) => fetchData(`/movie/${id}?language=en-US`);

export const getMovieCast = (id) =>
  fetchData(`/movie/${id}/credits?language=en-US`);

export const getMovieReviews = (id) =>
  fetchData(`/movie/${id}/reviews?language=en-US`);

export const searchMovies = (query) =>
  fetchData(`/search/movie?query=${encodeURIComponent(query)}&language=en-US`);
