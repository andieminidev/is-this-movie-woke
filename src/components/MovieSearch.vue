<template>
  <div class="w-full max-w-xl mx-auto relative">
    <!-- Search Input -->
    <div class="relative">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search any movie..."
        class="w-full px-6 py-4 pl-12 text-lg rounded-full bg-white/10 backdrop-blur-md 
               text-white placeholder-gray-400 border border-white/20 
               focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <!-- Search Icon -->
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

    <!-- Search Results -->
    <div 
      v-if="searchQuery.length > 0"
      class="absolute w-full mt-2 bg-white/10 backdrop-blur-md rounded-2xl 
             border border-white/20 overflow-hidden z-50"
    >
      <div 
        v-for="movie in movies" 
        :key="movie.id"
        class="flex items-center gap-3 p-4 hover:bg-white/20 cursor-pointer transition"
        @click="selectMovie(movie)"
      >
        <img 
          :src="movie.poster || 'https://placehold.co/40x60'" 
          :alt="movie.title"
          class="w-10 h-15 rounded object-cover"
        />
        <div>
          <div class="text-white font-medium">{{ movie.title }}</div>
          <div class="text-gray-400 text-sm">{{ movie.year }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const movies = ref([
  { id: 1, title: 'The Little Mermaid', year: '2023' },
  { id: 2, title: 'Captain Marvel', year: '2019' },
  { id: 3, title: 'Black Panther: Wakanda Forever', year: '2022' }
])

const selectMovie = (movie) => {
  // We'll implement this later
  console.log('Selected movie:', movie)
}
</script>
