<template>
  <div class="w-full max-w-4xl mx-auto mb-5">
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
            <div class="text-gray-400">Rotten Tomatoes🍅</div>
            <div class="text-white font-bold">{{ movie.rtScore }}%</div>
          </div>
          <div class="bg-white/5 p-3 rounded-lg">
            <div class="text-gray-400">Metacritic 📊</div>
            <div class="text-white font-bold">{{ movie.metacritic }}/100</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 mb-8">
      <div class="grid md:grid-cols-2 gap-8">
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-white mb-4">Best Viewing Experience 🎯</h3>
          
          <div class="bg-white/5 p-4 rounded-lg">
            <div class="text-gray-400 mb-2">Recommended Company</div>
            <div class="flex flex-wrap gap-2">
              <span v-for="type in getViewingCompany(movie)" 
                    :key="type"
                    class="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300">
                {{ type }}
              </span>
            </div>
          </div>

          <div class="bg-white/5 p-4 rounded-lg">
            <div class="text-gray-400 mb-2">Attention Level</div>
            <div class="text-white">{{ getAttentionLevel(movie) }}</div>
          </div>

          <div class="bg-white/5 p-4 rounded-lg">
            <div class="text-gray-400 mb-2">Production Scale</div>
            <div class="text-white">{{ getProductionScale(movie.budget) }}</div>
          </div>

          <div class="bg-white/5 p-4 rounded-lg">
            <div class="text-gray-400 mb-2">Themes & Elements</div>
            <div class="flex flex-wrap gap-2">
              <span v-for="keyword in movie.keywords.slice(0, 5)" 
                    :key="keyword"
                    class="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">
                {{ keyword }}
              </span>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-white mb-4">Time Investment ⏱️</h3>
          
          <div class="bg-white/5 p-4 rounded-lg">
            <div class="text-gray-400 mb-2">Length Category</div>
            <div class="flex items-center gap-3">
              <span class="text-white font-medium">{{ getLengthCategory(movie.runtime) }}</span>
              <span class="text-sm px-2 py-1 rounded-full" 
                    :class="getLengthCategoryColor(movie.runtime)">
                {{ movie.runtime }}
              </span>
            </div>
          </div>

          <div class="bg-white/5 p-4 rounded-lg">
            <div class="text-gray-400 mb-2">Viewing Strategy</div>
            <div class="space-y-2">
              <div class="text-white">{{ getViewingStrategy(movie.runtime) }}</div>
              <div class="text-sm text-purple-300">{{ getTimeCommitmentTip(movie.runtime) }}</div>
            </div>
          </div>

          <div class="bg-white/5 p-4 rounded-lg">
            <div class="text-gray-400 mb-2">Time-Value Score</div>
            <div class="flex items-center gap-4">
              <div class="text-2xl font-bold" :class="getTimeValueColor(movie)">
                {{ calculateTimeValueScore(movie) }}/10
              </div>
              <div class="text-sm text-gray-300">
                {{ getTimeValueExplanation(movie) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20">
      <h3 class="text-xl font-semibold text-white mb-4">If You Enjoy This, Watch These Next 🍿</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="similar in movie.similar" 
             :key="similar.id"
             class="bg-white/5 p-4 rounded-lg group hover:bg-white/10 transition-all duration-300 cursor-pointer"
             @click="emit('select-movie', {
               id: similar.id,
               title: similar.title,
               poster: similar.poster,
               year: similar.year
             })"
        >
          <img 
            :src="similar.poster" 
            :alt="similar.title"
            class="w-full h-48 object-cover rounded-lg mb-3 shadow-lg"
          />
          <div class="text-white font-medium mb-2 text-lg">{{ similar.title }}</div>
          
          <div class="flex items-center gap-2 mb-2">
            <span class="text-yellow-400">⭐️ {{ similar.rating }}/10</span>
            <span class="text-gray-400">•</span>
            <span class="text-gray-400">{{ similar.year }}</span>
          </div>
          
          <div class="flex flex-wrap gap-2 mb-3">
            <span 
              v-for="genre in similar.genres.slice(0, 2)" 
              :key="genre.id"
              class="px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs"
            >
              {{ genre.name }}
            </span>
          </div>
          
          <div class="space-y-2">
            <div class="text-gray-400 text-sm">Runtime: {{ similar.runtime }}</div>
            <div class="text-sm text-purple-300">
              {{ getViewingStrategy(similar.runtime) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['select-movie']);

const getViewingCompany = (movie) => {
  const companies = [];
  if (movie.genres.some(g => g.name.includes('Family'))) companies.push('Family');
  if (movie.genres.some(g => g.name.includes('Romance'))) companies.push('Date Night');
  if (movie.genres.some(g => g.name.includes('Horror'))) companies.push('Friends');
  if (movie.genres.some(g => g.name.includes('Documentary'))) companies.push('Solo');
  if (movie.keywords.some(k => k.includes('superhero'))) companies.push('Fan Groups');
  if (movie.keywords.some(k => k.includes('based on novel'))) companies.push('Book Clubs');
  if (companies.length === 0) companies.push('Any');
  return companies;
};

const getAttentionLevel = (movie) => {
  if (movie.genres.some(g => g.name.includes('Documentary') || g.name.includes('Drama'))) {
    return "High attention required - Complex plot or detailed information";
  }
  if (movie.genres.some(g => g.name.includes('Action') || g.name.includes('Comedy'))) {
    return "Moderate attention - Can be enjoyed casually";
  }
  return "Flexible - Suitable for both focused and casual viewing";
};

const getViewingStrategy = (runtime) => {
  const [hours, minutes] = runtime.split('h ');
  const totalMinutes = (parseInt(hours) * 60) + parseInt(minutes);
  
  if (totalMinutes > 180) {
    return 'Consider splitting into two viewing sessions';
  } else if (totalMinutes > 150) {
    return 'Plan for one long session with an intermission';
  } else if (totalMinutes > 120) {
    return 'Best watched with a short break in between';
  } else {
    return 'Perfect for one comfortable viewing session';
  }
};

const getLengthCategory = (runtime) => {
  const [hours, minutes] = runtime.split('h ');
  const totalMinutes = (parseInt(hours) * 60) + parseInt(minutes);
  
  if (totalMinutes < 90) return 'Short & Sweet';
  if (totalMinutes < 120) return 'Standard Length';
  if (totalMinutes < 150) return 'Extended Feature';
  return 'Epic Length';
};

const getLengthCategoryColor = (runtime) => {
  const minutes = parseInt(runtime);
  if (minutes < 90) return 'bg-green-500/20 text-green-300';
  if (minutes < 120) return 'bg-blue-500/20 text-blue-300';
  if (minutes < 150) return 'bg-yellow-500/20 text-yellow-300';
  return 'bg-red-500/20 text-red-300';
};

const getTimeCommitmentTip = (runtime) => {
  const [hours, minutes] = runtime.split('h ');
  const totalMinutes = (parseInt(hours) * 60) + parseInt(minutes);
  
  if (totalMinutes < 90) {
    return 'Perfect for a quick movie night or afternoon break';
  } else if (totalMinutes < 120) {
    return 'Ideal for a dedicated evening viewing';
  } else if (totalMinutes < 150) {
    return 'Consider planning a short intermission';
  } else {
    return 'Best enjoyed with an intermission break - plan for a longer session';
  }
};

const calculateTimeValueScore = (movie) => {
  const imdbScore = parseFloat(movie.imdbRating);
  const rtScore = movie.rtScore / 10; 
  const metacriticScore = movie.metacritic / 10; 

  const weightedRating = (imdbScore * 0.4) + (rtScore * 0.3) + (metacriticScore * 0.3);

  const [hours, minutes] = movie.runtime.split('h ');
  const totalMinutes = (parseInt(hours) * 60) + parseInt(minutes);
  
  let score = weightedRating;
  
  if (totalMinutes > 180) score -= 2; 
  else if (totalMinutes > 150) score -= 1; 
  else if (totalMinutes > 120) score -= 0.5; 
  else if (totalMinutes < 90) score += 1; 
  else if (totalMinutes < 120) score += 0.5; 
  
  const ratingDeviation = Math.max(
    Math.abs(imdbScore - rtScore),
    Math.abs(imdbScore - metacriticScore),
    Math.abs(rtScore - metacriticScore)
  );
  
  if (ratingDeviation > 2) score -= 0.5;
  
  return Math.min(Math.max(Math.round(score * 10) / 10, 1), 10);
};

const getTimeValueColor = (movie) => {
  const score = calculateTimeValueScore(movie);
  if (score >= 8) return 'text-green-400';
  if (score >= 6) return 'text-yellow-400';
  return 'text-red-400';
};

const getTimeValueExplanation = (movie) => {
  const score = calculateTimeValueScore(movie);
  if (score >= 8) return 'Exceptional time investment';
  if (score >= 6) return 'Worth your time';
  if (score >= 4) return "Consider if you're a fan of the genre";
  return 'Might not be the best use of your time';
};

const getProductionScale = (budget) => {
  if (!budget) return 'Independent/Low Budget';
  if (budget < 5000000) return 'Micro-budget Independent Film';
  if (budget < 30000000) return 'Mid-range Independent Film';
  if (budget < 100000000) return 'Major Studio Production';
  return 'Blockbuster Production';
};
</script>
