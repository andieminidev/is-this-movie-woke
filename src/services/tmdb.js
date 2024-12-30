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
    const [details, similar, credits, keywords] = await Promise.all([
      tmdbApi.get(`/movie/${movieId}`),
      tmdbApi.get(`/movie/${movieId}/similar`),
      tmdbApi.get(`/movie/${movieId}/credits`),
      tmdbApi.get(`/movie/${movieId}/keywords`)
    ]);
    
    const similarMoviesWithRuntime = await Promise.all(
      (similar.data.results || [])  
        .filter(movie => movie && movie.id)
        .slice(0, 3)
        .map(async movie => {
          try {
            const details = await tmdbApi.get(`/movie/${movie.id}`);
            return {
              id: movie.id,
              title: movie.title || 'Unknown Title',
              poster: details.data.poster_path 
                ? `https://image.tmdb.org/t/p/w500${details.data.poster_path}`
                : null,
              runtime: details.data.runtime 
                ? `${Math.floor(details.data.runtime / 60)}h ${details.data.runtime % 60}m`
                : 'Unknown',
              rating: (details.data.vote_average || 0).toFixed(1),
              year: details.data.release_date 
                ? new Date(details.data.release_date).getFullYear()
                : 'Unknown',
              genres: (details.data.genres || []).slice(0, 2),
              originalRuntime: details.data.runtime || 0
            };
          } catch (error) {
            console.error(`Error fetching details for similar movie ${movie.id}:`, error);
            return null;
          }
        })
    );

    const validSimilarMovies = similarMoviesWithRuntime.filter(movie => movie !== null);

    return {
      ...details.data,
      poster: details.data.poster_path 
        ? `https://image.tmdb.org/t/p/w500${details.data.poster_path}`
        : null,
      year: new Date(details.data.release_date).getFullYear(),
      synopsis: details.data.overview,
      similar: validSimilarMovies,
      runtime: details.data.runtime 
        ? `${Math.floor(details.data.runtime / 60)}h ${details.data.runtime % 60}m`
        : 'Unknown',
      cast: credits.data.cast.slice(0, 3).map(actor => actor.name),
      director: credits.data.crew.find(p => p.job === 'Director')?.name,
      keywords: keywords.data.keywords.map(k => k.name),
      budget: details.data.budget,
      popularity: details.data.popularity,
      originalLanguage: details.data.original_language
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getRecentPopularMovies = async () => {
  try {
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
