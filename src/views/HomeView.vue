<template>
  <div class="min-h-[calc(100vh-8rem)] flex flex-col items-center py-8 md:py-12">
    <div class="max-w-2xl mx-auto text-center mb-8 md:mb-12 mt-4 md:mt-8 px-4">
      <h2 class="text-3xl md:text-5xl font-bold text-white mb-4">
        Is This Movie Worth Your Time? 🎬
      </h2>
      <p class="text-lg md:text-xl text-gray-300">
        Get instant insights about movies to help you decide if they're worth watching ✨
      </p>
    </div>

    <div class="w-full max-w-xl mx-auto px-4">
      <MovieSearch @select-movie="handleMovieSelect" />
    </div>

    <div v-if="!selectedMovie" class="mt-8 md:mt-12 text-center px-4">
      <h3 class="text-lg md:text-xl text-white mb-4">Try These Movies 🍿</h3>
      <div class="flex flex-wrap justify-center gap-3">
        <button 
          v-for="movie in popularMovies" 
          :key="movie.id"
          @click="handleMovieSelect(movie)"
          class="px-5 py-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
        >
          {{ movie.title }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="mt-8 w-full max-w-4xl mx-auto px-4 loading-section">
      <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
        <div class="flex flex-col items-center justify-center space-y-4">
          <div class="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          <div class="text-center">
            <h3 class="text-xl font-semibold text-white mb-2">Loading Movie Details</h3>
            <p class="text-gray-400">Getting all the insights ready for you ✨</p>
          </div>
        </div>
      </div>
    </div>

    <MovieInsights 
      v-if="selectedMovie && !loading" 
      :movie="selectedMovie"
      @select-movie="handleMovieSelect"
      class="mt-8 md:mt-12 px-4"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import MovieSearch from '../components/MovieSearch.vue'
import MovieInsights from '../components/MovieInsights.vue'
import { getMovieDetails, getRecentPopularMovies } from '../services/tmdb'

const selectedMovie = ref(null)
const loading = ref(false)
const popularMovies = ref([])
const movieInsightsRef = ref(null)

onMounted(async () => {
  try {
    popularMovies.value = await getRecentPopularMovies()
  } catch (error) {
    console.error('Error loading popular movies:', error)
  }
})

const handleMovieSelect = async (movie) => {
  loading.value = true
  try {
    const details = await getMovieDetails(movie.id)
    selectedMovie.value = {
      ...movie,
      poster: details.poster,
      year: details.year,
      runtime: details.runtime,
      rating: details.adult ? 'R' : 'PG-13',
      synopsis: details.synopsis,
      imdbRating: (details.vote_average || 0).toFixed(1),
      rtScore: Math.round((details.vote_average || 0) * 10),
      metacritic: Math.round((details.vote_average || 0) * 10),
      genres: details.genres || [],
      similar: details.similar || [],
      cast: details.cast || [],
      director: details.director || 'Unknown',
      keywords: details.keywords || [],
      budget: details.budget || 0
    }
    
    await nextTick()
    const loadingElement = document.querySelector('.loading-section')
    if (loadingElement) {
      loadingElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  } catch (error) {
    console.error('Error loading movie details:', error)
  } finally {
    loading.value = false
  }
}
</script>
