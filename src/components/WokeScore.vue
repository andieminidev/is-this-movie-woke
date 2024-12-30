<template>
  <div class="w-full max-w-4xl mx-auto mb-5">
    <!-- Movie Header -->
    <div class="flex flex-col md:flex-row gap-8 mb-8 md:mb-12 bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20">
      <img 
        :src="movie.poster || 'https://placehold.co/300x450'" 
        :alt="movie.title"
        class="w-full md:w-72 rounded-lg object-cover shadow-xl"
      />
      <div class="flex-1 space-y-6">
        <h2 class="text-3xl font-bold text-white mb-2">{{ movie.title }} ⭐️</h2>
        <div class="flex gap-2 text-sm text-gray-300 mb-4">
          <span>{{ movie.year }}</span>
          <span>•</span>
          <span>{{ movie.runtime }}</span>
          <span>•</span>
          <span>{{ movie.rating }}</span>
        </div>
        <p class="text-gray-300 mb-4">{{ movie.synopsis }}</p>
        
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div class="bg-white/5 p-3 rounded-lg">
            <div class="text-gray-400">IMDB 🎭</div>
            <div class="text-white font-bold">{{ movie.imdbRating }}/10</div>
          </div>
          <div class="bg-white/5 p-3 rounded-lg">
            <div class="text-gray-400">Rotten Tomatoes 🍅</div>
            <div class="text-white font-bold">{{ movie.rtScore }}%</div>
          </div>
          <div class="bg-white/5 p-3 rounded-lg">
            <div class="text-gray-400">Metacritic 📊</div>
            <div class="text-white font-bold">{{ movie.metacritic }}/100</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Woke Score Section -->
    <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 mb-8 md:mb-12">
      <div class="text-center mb-8">
        <div class="text-6xl font-bold text-white mb-2">{{ wokeScore }}% 🧐</div>
        <div class="text-xl text-purple-300 mb-4">Woke Score</div>
        <p class="text-gray-300 italic">
          "{{ getWokeComment(wokeScore) }}"
        </p>
      </div>

      <div class="max-w-2xl mx-auto">
        <h3 class="text-white font-semibold mb-4">How we determined this: 🔍</h3>
        <p class="text-gray-300 mb-6">
          We analyzed {{ reviewCount }} reviews using our advanced algorithm that looks for specific 
          patterns and themes in viewer discussions. Our analysis focuses on representation, 
          social messaging, and cultural impact.
        </p>
      </div>
    </div>

    <!-- Analysis Details -->
    <div class="grid md:grid-cols-2 gap-6 md:gap-8">
      <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20">
        <h3 class="text-white font-semibold mb-4">Most Discussed Themes 📝</h3>
        <div class="flex flex-wrap gap-2">
          <span v-for="theme in themes" 
                :key="theme"
                class="px-3 py-1 rounded-full bg-white/10 text-sm text-white">
            {{ theme }}
          </span>
        </div>
      </div>

      <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20">
        <h3 class="text-white font-semibold mb-4">Review Highlights 💭</h3>
        <div class="space-y-3 text-sm text-gray-300">
          <p v-for="(quote, i) in reviewQuotes" 
             :key="i"
             class="italic">
            "{{ quote }}"
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  movie: {
    type: Object,
    required: true,
    default: () => ({
      title: 'The Little Mermaid',
      year: '2023',
      runtime: '2h 15m',
      rating: 'PG',
      synopsis: 'A young mermaid makes a deal with a sea witch to trade her beautiful voice for human legs so she can discover the world above water and impress a prince.',
      imdbRating: '7.2',
      rtScore: '94',
      metacritic: '85'
    })
  }
})

const wokeScore = 22
const reviewCount = 1234
const themes = [
  'Female Empowerment',
  'Cultural Diversity',
  'Social Commentary',
  'Representation',
  'Traditional Values'
]
const reviewQuotes = [
  'This remake brings much-needed representation to a classic tale',
  'The themes of identity and self-discovery resonate strongly',
  'A fresh take that stays true to the original while reflecting modern values'
]

const getWokeComment = (score) => {
  if (score >= 90) return "This one's so woke it probably doesn't even sleep!"
  if (score >= 70) return "Definitely wearing its progressive values on its sleeve"
  if (score >= 50) return "Balancing traditional and contemporary perspectives"
  if (score >= 30) return "Mostly sticking to traditional storytelling"
  return "About as woke as a hibernating bear"
}
</script>
