export const wokeKeywords = {
  woke_specific: [
    { word: 'woke', weight: 2.0 },
    { word: 'wokeism', weight: 2.0 },
    { word: 'wokeness', weight: 2.0 },
    { word: 'anti-woke', weight: 1.8 },
    { word: 'virtue signaling', weight: 1.8 },
    { word: 'cancel culture', weight: 1.7 },
    { word: 'politically correct', weight: 1.6 },
    { word: 'social justice warrior', weight: 1.8 },
    { word: 'sjw', weight: 1.8 },
    { word: 'leftist agenda', weight: 1.7 },
    { word: 'liberal agenda', weight: 1.7 },
    { word: 'forced diversity', weight: 1.8 },
    { word: 'pandering', weight: 1.6 },
    { word: 'indoctrination', weight: 1.7 },
    { word: 'propaganda', weight: 1.6 }
  ],
  identity: [
    { word: 'representation', weight: 1.5 },
    { word: 'diversity', weight: 1.5 },
    { word: 'inclusive', weight: 1.3 },
    { word: 'marginalized', weight: 1.4 },
    { word: 'patriarchy', weight: 1.3 },
    { word: 'privilege', weight: 1.4 },
    { word: 'intersectional', weight: 1.5 },
    { word: 'gender', weight: 1.2 },
    { word: 'pronouns', weight: 1.3 },
    { word: 'queer', weight: 1.3 },
    { word: 'lgbtq', weight: 1.3 },
    { word: 'transgender', weight: 1.3 },
    { word: 'non-binary', weight: 1.3 },
    { word: 'identity', weight: 1.2 },
    'empowerment',
    'authentic',
    'visibility',
    { word: 'cisgender', weight: 1.4 },
    { word: 'heteronormative', weight: 1.5 },
    { word: 'gender fluid', weight: 1.4 },
    { word: 'gender expression', weight: 1.4 },
    { word: 'misgendering', weight: 1.5 },
    { word: 'deadnaming', weight: 1.5 }
  ],
  social: [
    { word: 'problematic', weight: 1.4 },
    { word: 'toxic masculinity', weight: 1.5 },
    { word: 'microaggression', weight: 1.4 },
    { word: 'cultural appropriation', weight: 1.5 },
    { word: 'triggered', weight: 1.2 },
    { word: 'safe space', weight: 1.3 },
    { word: 'whitewashing', weight: 1.4 },
    { word: 'stereotypes', weight: 1.3 },
    'bias',
    'prejudice',
    'discrimination',
    'misogyny',
    'mansplaining',
    'gaslighting',
    { word: 'white fragility', weight: 1.6 },
    { word: 'white privilege', weight: 1.6 },
    { word: 'male gaze', weight: 1.4 },
    { word: 'manspreading', weight: 1.3 },
    { word: 'tone policing', weight: 1.4 },
    { word: 'gatekeeping', weight: 1.3 }
  ],
  political: [
    { word: 'social justice', weight: 1.5 },
    { word: 'systemic racism', weight: 1.5 },
    { word: 'colonialism', weight: 1.4 },
    { word: 'oppression', weight: 1.4 },
    { word: 'activism', weight: 1.3 },
    { word: 'progressive', weight: 1.3 },
    { word: 'resistance', weight: 1.2 },
    'revolution',
    'equality',
    'equity',
    'liberation',
    'decolonize',
    'anti-racist'
  ],
  messaging: [
    { word: 'message', weight: 1.2 },
    { word: 'agenda', weight: 1.3 },
    { word: 'political correctness', weight: 1.4 },
    { word: 'preach', weight: 1.3 },
    { word: 'propaganda', weight: 1.3 },
    'narrative',
    'statement',
    'commentary',
    'discourse',
    'subvert'
  ],
  context_modifiers: [
    { word: 'too', weight: 0.3 },
    { word: 'very', weight: 0.3 },
    { word: 'extremely', weight: 0.4 },
    { word: 'overly', weight: 0.4 },
    { word: 'forced', weight: 0.5 }
  ]
};

export const contextPatterns = [
  {
    pattern: /trying too hard to be (woke|diverse|inclusive)/i,
    weight: 1.8
  },
  {
    pattern: /forcing (diversity|representation|inclusion)/i,
    weight: 1.7
  },
  {
    pattern: /unnecessary (diversity|representation|inclusion)/i,
    weight: 1.6
  },
  {
    pattern: /(pushing|shoving) (agenda|message)/i,
    weight: 1.5
  }
];
