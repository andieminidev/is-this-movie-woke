import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const searchMovies = async (query) => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: { query },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const [details, reviews, credits] = await Promise.all([
      tmdbApi.get(`/movie/${movieId}`),
      tmdbApi.get(`/movie/${movieId}/reviews`),
      tmdbApi.get(`/movie/${movieId}/credits`)
    ]);
    
    return {
      ...details.data,
      poster: details.data.poster_path 
        ? `https://image.tmdb.org/t/p/w500${details.data.poster_path}`
        : null,
      year: new Date(details.data.release_date).getFullYear(),
      synopsis: details.data.overview,
      reviews: reviews.data.results,
      credits: credits.data
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getRecentPopularMovies = async () => {
  try {
    // Get movies from the past year
    const currentDate = new Date();
    const lastYear = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));
    const formattedDate = lastYear.toISOString().split('T')[0];

    const response = await tmdbApi.get('/discover/movie', {
      params: {
        'primary_release_date.gte': formattedDate,
        'sort_by': 'popularity.desc',
        'page': Math.floor(Math.random() * 5) + 1 
      }
    });

    const movies = response.data.results
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(movie => ({
        id: movie.id,
        title: movie.title
      }));

    return movies;
  } catch (error) {
    console.error('Error fetching recent popular movies:', error);
    throw error;
  }
};
