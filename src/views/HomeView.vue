<template>
  <div class="min-h-[calc(100vh-8rem)] flex flex-col items-center py-8 md:py-12">
    <!-- Hero Section -->
    <div class="max-w-2xl mx-auto text-center mb-8 md:mb-12 mt-4 md:mt-8 px-4">
      <h2 class="text-3xl md:text-5xl font-bold text-white mb-4">
        Check Any Movie's Woke Score 🎬
      </h2>
      <p class="text-lg md:text-xl text-gray-300">
        Instantly analyze reviews to see how "woke" a movie really is ✨
      </p>
    </div>

    <!-- Search Section -->
    <div class="w-full max-w-xl mx-auto px-4">
      <MovieSearch @select-movie="handleMovieSelect" />
    </div>

    <!-- Popular Searches -->
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

    <!-- Movie Score -->
    <WokeScore 
      v-if="selectedMovie" 
      :movie="selectedMovie"
      :score="movieScore"
      class="mt-8 md:mt-12 px-4"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MovieSearch from '../components/MovieSearch.vue'
import WokeScore from '../components/WokeScore.vue'

const selectedMovie = ref(null)
const movieScore = ref({
  wokeScore: 75,
  categories: {
    diversity: 8,
    genderRepresentation: 7,
    socialMessages: 6
  }
})

const popularMovies = [
  { id: 1, title: 'The Little Mermaid' },
  { id: 2, title: 'Captain Marvel' },
  { id: 3, title: 'Black Panther' }
]

const handleMovieSelect = (movie) => {
  selectedMovie.value = movie
  // For now, we'll use the same hardcoded score
  // Later this will come from the API
}
</script>
