import { wokeKeywords, contextPatterns } from '../utils/wokeKeywords';

export const analyzeWokeScore = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return {
      wokeScore: 0,
      reviewCount: 0,
      themes: [],
      reviewQuotes: [],
      sentiment: 'neutral'
    };
  }

  const allReviewText = reviews.map(review => review.content.toLowerCase()).join(' ');
  let totalScore = 0;
  let keywordCounts = {};
  let wordFrequency = {};
  let patternMatches = [];

  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);
  const words = allReviewText.split(/\W+/).filter(word => 
    word.length > 3 && !commonWords.has(word)
  );

  words.forEach(word => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });

  Object.entries(wokeKeywords).forEach(([category, words]) => {
    words.forEach(word => {
      const keyword = typeof word === 'object' ? word.word : word;
      const weight = typeof word === 'object' ? word.weight : 1;
      
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = allReviewText.match(regex) || [];
      
      if (matches.length > 0) {
        keywordCounts[keyword] = matches.length;
        totalScore += matches.length * weight;
      }
    });
  });

  contextPatterns.forEach(({ pattern, weight }) => {
    const matches = allReviewText.match(pattern) || [];
    if (matches.length > 0) {
      patternMatches.push(...matches);
      totalScore += matches.length * weight;
    }
  });

  const allThemes = [
    ...Object.entries(keywordCounts),
    ...Object.entries(wordFrequency)
  ].sort((a, b) => b[1] - a[1]);

  const uniqueThemes = Array.from(new Set(
    allThemes.map(([word]) => word)
  )).slice(0, 8);

  const normalizedScore = Math.min(Math.round((totalScore / (reviews.length * 15)) * 100), 100);

  return {
    wokeScore: normalizedScore,
    reviewCount: reviews.length,
    themes: uniqueThemes,
    reviewQuotes: getRelevantQuotes(reviews, uniqueThemes),
    sentiment: getSentiment(normalizedScore),
    wordFrequency: Object.fromEntries(
      Object.entries(wordFrequency)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
    )
  };
};

const getRelevantQuotes = (reviews, themes) => {
  const cleanedReviews = reviews
    .filter(review => {
      const content = review.content.toLowerCase();
      return content.length > 20 && 
             !content.includes('http') &&
             !content.startsWith('spoiler') &&
             !content.startsWith('full review');
    })
    .map(review => {
      let content = review.content
        .replace(/https?:\/\/[^\s]+/g, '')
        .replace(/^(full )?review:?/i, '')
        .replace(/^spoiler( warning)?:?/i, '')
        .replace(/[_*]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      const sentences = content.match(/[^.!?]+[.!?]+/g) || [content];
      
      const bestSentence = sentences.find(sentence => 
        themes.some(theme => sentence.toLowerCase().includes(theme.toLowerCase()))
      ) || sentences[0];

      return bestSentence.trim();
    });

  return cleanedReviews
    .filter(quote => quote.length >= 30 && quote.length <= 200) 
    .sort((a, b) => {
      const aThemeCount = themes.filter(theme => 
        a.toLowerCase().includes(theme.toLowerCase())
      ).length;
      const bThemeCount = themes.filter(theme => 
        b.toLowerCase().includes(theme.toLowerCase())
      ).length;
      
      return bThemeCount - aThemeCount;
    })
    .slice(0, 3)
    .map(quote => {
      let cleanQuote = quote.trim();
      if (!cleanQuote.match(/[.!?]$/)) {
        cleanQuote += '.';
      }
      return cleanQuote.charAt(0).toUpperCase() + cleanQuote.slice(1);
    });
};

const getSentiment = (score) => {
  if (score >= 80) return 'extremely_woke';
  if (score >= 60) return 'very_woke';
  if (score >= 40) return 'moderately_woke';
  if (score >= 20) return 'slightly_woke';
  return 'not_woke';
};
