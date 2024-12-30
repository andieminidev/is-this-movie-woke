<template>
  <div class="w-full max-w-xl mx-auto relative">
    <div class="relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="handleSearch"
        placeholder="Search any movie..."
        class="w-full px-6 py-4 pl-12 text-lg rounded-full bg-white/10 backdrop-blur-md 
               text-white placeholder-gray-400 border border-white/20 
               focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <svg 
        class="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>

    <div 
      v-if="searchResults.length > 0"
      class="absolute w-full mt-2 bg-white/10 backdrop-blur-md rounded-2xl 
             border border-white/20 overflow-hidden z-50 max-h-[240px] overflow-y-auto
             scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
    >
      <div 
        v-for="movie in searchResults" 
        :key="movie.id"
        class="flex items-center gap-3 p-4 hover:bg-white/20 cursor-pointer transition"
        @click="selectMovie(movie)"
      >
        <img 
          :src="movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : 'https://placehold.co/40x60'" 
          :alt="movie.title"
          class="w-10 h-15 rounded object-cover"
        />
        <div>
          <div class="text-white font-medium">{{ movie.title }}</div>
          <div class="text-gray-400 text-sm">{{ new Date(movie.release_date).getFullYear() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { searchMovies } from '../services/tmdb'
import { useDebounceFn } from '@vueuse/core'

const emit = defineEmits(['select-movie'])
const searchQuery = ref('')
const searchResults = ref([])

const handleSearch = useDebounceFn(async () => {
  if (searchQuery.value.length < 2) {
    searchResults.value = []
    return
  }

  try {
    const results = await searchMovies(searchQuery.value)
    searchResults.value = results 
  } catch (error) {
    console.error('Error searching movies:', error)
    searchResults.value = []
  }
}, 300)

const selectMovie = (movie) => {
  const formattedMovie = {
    id: movie.id,
    title: movie.title,
    year: new Date(movie.release_date).getFullYear(),
    poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
    synopsis: movie.overview
  }
  emit('select-movie', formattedMovie)
  searchQuery.value = ''
  searchResults.value = []
}
</script>

<style>
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
