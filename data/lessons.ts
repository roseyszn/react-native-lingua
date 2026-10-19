import type { Lesson, LessonActivity, LessonGoal, PhraseItem, VocabularyItem } from "../types/learning";

const spanishVocabulary: VocabularyItem[] = [
  {
    id: "es-vocab-1",
    word: "hola",
    translation: "hello",
    pronunciation: "OH-lah",
    example: "Hola, ¿cómo estás?",
    category: "greetings",
  },
  {
    id: "es-vocab-2",
    word: "gracias",
    translation: "thank you",
    pronunciation: "GRAH-see-ahs",
    example: "Gracias por tu ayuda.",
    category: "politeness",
  },
  {
    id: "es-vocab-3",
    word: "agua",
    translation: "water",
    pronunciation: "AH-gwah",
    example: "Quiero agua, por favor.",
    category: "food and drink",
  },
  {
    id: "es-vocab-4",
    word: "casa",
    translation: "house",
    pronunciation: "KAH-sah",
    example: "Mi casa es grande.",
    category: "daily life",
  },
];

const spanishPhrases: PhraseItem[] = [
  {
    id: "es-phrase-1",
    phrase: "¿Dónde está el baño?",
    translation: "Where is the bathroom?",
    pronunciation: "DOHN-deh ehs-tah el BAHN-yoh",
    context: "Travel situation",
  },
  {
    id: "es-phrase-2",
    phrase: "Me llamo Ana.",
    translation: "My name is Ana.",
    pronunciation: "meh YAH-moh AH-nah",
    context: "Introductions",
  },
];

const spanishActivities: LessonActivity[] = [
  {
    id: "es-activity-1",
    type: "match",
    prompt: "Match the Spanish word with the correct English meaning.",
    instructions: "Tap the correct pair.",
    choices: ["hola / hello", "agua / water", "gracias / thank you"],
    answer: "hola / hello",
  },
  {
    id: "es-activity-2",
    type: "listen",
    prompt: "Listen to the phrase and repeat it naturally.",
    instructions: "Focus on the rhythm and pronunciation.",
    answer: "¿Dónde está el baño?",
  },
];

const spanishGoals: LessonGoal[] = [
  { id: "es-goal-1", text: "Greet people in Spanish with confidence." },
  { id: "es-goal-2", text: "Use basic polite expressions in daily life." },
  { id: "es-goal-3", text: "Understand and say useful travel phrases." },
];

const frenchVocabulary: VocabularyItem[] = [
  {
    id: "fr-vocab-1",
    word: "bonjour",
    translation: "hello",
    pronunciation: "bohn-ZHOOR",
    example: "Bonjour, comment ça va ?",
    category: "greetings",
  },
  {
    id: "fr-vocab-2",
    word: "merci",
    translation: "thank you",
    pronunciation: "mehr-SEE",
    example: "Merci beaucoup.",
    category: "politeness",
  },
  {
    id: "fr-vocab-3",
    word: "pain",
    translation: "bread",
    pronunciation: "PAN",
    example: "Je veux du pain.",
    category: "food",
  },
];

const frenchPhrases: PhraseItem[] = [
  {
    id: "fr-phrase-1",
    phrase: "Je m'appelle Luc.",
    translation: "My name is Luc.",
    pronunciation: "zhuh mah-PELL LOOK",
  },
  {
    id: "fr-phrase-2",
    phrase: "Où est la gare ?",
    translation: "Where is the station?",
    pronunciation: "oo eh lah gahr",
    context: "Travel",
  },
];

const frenchActivities: LessonActivity[] = [
  {
    id: "fr-activity-1",
    type: "translate",
    prompt: "Translate the phrase into English.",
    instructions: "Keep the meaning simple and natural.",
    choices: ["My name is Luc.", "I like bread.", "Where is the station?"],
    answer: "My name is Luc.",
  },
  {
    id: "fr-activity-2",
    type: "conversation",
    prompt: "Respond to the greeting in French.",
    instructions: "Use a friendly, polite response.",
    answer: "Bonjour !",
  },
];

const frenchGoals: LessonGoal[] = [
  { id: "fr-goal-1", text: "Introduce yourself clearly." },
  { id: "fr-goal-2", text: "Use simple, polite everyday phrases." },
];

const germanVocabulary: VocabularyItem[] = [
  {
    id: "de-vocab-1",
    word: "hallo",
    translation: "hello",
    pronunciation: "HAH-loh",
    example: "Hallo, wie geht's?",
    category: "greetings",
  },
  {
    id: "de-vocab-2",
    word: "danke",
    translation: "thank you",
    pronunciation: "DAHN-keh",
    example: "Danke für deine Hilfe.",
    category: "politeness",
  },
  {
    id: "de-vocab-3",
    word: "Wasser",
    translation: "water",
    pronunciation: "VAH-ser",
    example: "Ich möchte Wasser.",
    category: "food and drink",
  },
];

const germanPhrases: PhraseItem[] = [
  {
    id: "de-phrase-1",
    phrase: "Ich heiße Emma.",
    translation: "My name is Emma.",
    pronunciation: "ikh HYE-seh EM-ah",
  },
  {
    id: "de-phrase-2",
    phrase: "Wo ist der Bahnhof?",
    translation: "Where is the station?",
    pronunciation: "voh ist dehr BAHN-hohf",
  },
];

const germanActivities: LessonActivity[] = [
  {
    id: "de-activity-1",
    type: "pronunciation",
    prompt: "Repeat the greeting with the correct sound.",
    instructions: "Keep it smooth and friendly.",
    answer: "Hallo",
  },
  {
    id: "de-activity-2",
    type: "match",
    prompt: "Match the German phrase to its English meaning.",
    instructions: "Choose the correct translation.",
    choices: ["Ich heiße Emma. / My name is Emma.", "Danke / hello", "Wasser / train"],
    answer: "Ich heiße Emma. / My name is Emma.",
  },
];

const germanGoals: LessonGoal[] = [
  { id: "de-goal-1", text: "Introduce yourself in German." },
  { id: "de-goal-2", text: "Use practical starter phrases in real contexts." },
];

export const lessons: Lesson[] = [
  {
    id: "spanish-lesson-1",
    unitId: "spanish-essentials",
    languageId: "spanish",
    slug: "first-hello-spanish",
    title: "First Hello",
    type: "core",
    difficulty: "beginner",
    xpReward: 50,
    description: "Learn greetings, polite words, and simple introductions in Spanish.",
    goals: spanishGoals,
    vocabulary: spanishVocabulary,
    phrases: spanishPhrases,
    activities: spanishActivities,
    aiTeacherPrompts: [
      {
        id: "es-ai-1",
        prompt: "Greet the learner warmly and explain how to say hello and thank you in Spanish.",
        tone: "friendly",
        context: "beginner lesson intro",
      },
      {
        id: "es-ai-2",
        prompt: "Practice a short conversation with simple phrases like '¿Cómo estás?' and 'Gracias'.",
        tone: "encouraging",
        context: "speaking practice",
      },
    ],
  },
  {
    id: "spanish-lesson-2",
    unitId: "spanish-essentials",
    languageId: "spanish",
    slug: "daily-routine-spanish",
    title: "Daily Routine",
    type: "audio",
    difficulty: "beginner",
    xpReward: 60,
    description: "Practice speaking about daily life and common objects in Spanish.",
    goals: [
      { id: "es-goal-4", text: "Name everyday objects in Spanish." },
      { id: "es-goal-5", text: "Say simple sentences about your routine." },
    ],
    vocabulary: [
      ...spanishVocabulary,
      {
        id: "es-vocab-5",
        word: "mañana",
        translation: "tomorrow / morning",
        pronunciation: "mah-NYAH-nah",
        example: "Mañana voy al trabajo.",
        category: "time",
      },
    ],
    phrases: [
      ...spanishPhrases,
      {
        id: "es-phrase-3",
        phrase: "Tengo hambre.",
        translation: "I am hungry.",
        pronunciation: "TEHN-goh AHM-breh",
      },
    ],
    activities: [
      ...spanishActivities,
      {
        id: "es-activity-3",
        type: "listen",
        prompt: "Listen for the daily-life sentence and choose the correct meaning.",
        instructions: "Focus on key words and context.",
        choices: ["I am hungry.", "I am at home.", "I like coffee."],
        answer: "I am hungry.",
      },
    ],
    aiTeacherPrompts: [
      {
        id: "es-ai-3",
        prompt: "Ask the learner to describe their morning in Spanish using three simple words.",
        tone: "supportive",
        context: "daily routine",
      },
    ],
  },
  {
    id: "spanish-lesson-3",
    unitId: "spanish-travel",
    languageId: "spanish",
    slug: "travel-hop-spanish",
    title: "Travel Hop",
    type: "conversation",
    difficulty: "beginner",
    xpReward: 70,
    description: "Practice travel phrases for asking directions and ordering food.",
    goals: [
      { id: "es-goal-6", text: "Ask for directions politely." },
      { id: "es-goal-7", text: "Order a drink or meal in a new place." },
    ],
    vocabulary: [
      { id: "es-vocab-6", word: "restaurante", translation: "restaurant", pronunciation: "res-tao-RAN-teh", category: "travel" },
      { id: "es-vocab-7", word: "camina", translation: "walk", pronunciation: "kah-MEE-nah", category: "directions" },
    ],
    phrases: [
      { id: "es-phrase-4", phrase: "¿Puede ayudarme?", translation: "Can you help me?", pronunciation: "poo-EH-dah ah-yoo-dar-meh" },
      { id: "es-phrase-5", phrase: "La cuenta, por favor.", translation: "The bill, please.", pronunciation: "lah KWEHN-tah pohr fah-VOHR" },
    ],
    activities: [
      {
        id: "es-activity-4",
        type: "conversation",
        prompt: "Roleplay a quick restaurant conversation in Spanish.",
        instructions: "Ask for the bill and say thank you.",
        answer: "La cuenta, por favor.",
      },
    ],
    aiTeacherPrompts: [
      {
        id: "es-ai-4",
        prompt: "Roleplay a traveler asking for help in a busy local area and guide them toward polite Spanish responses.",
        tone: "warm",
        context: "travel scenario",
      },
    ],
  },
  {
    id: "french-lesson-1",
    unitId: "french-essentials",
    languageId: "french",
    slug: "bonjour-french",
    title: "Bonjour",
    type: "core",
    difficulty: "beginner",
    xpReward: 50,
    description: "Learn greetings, polite phrases, and your first French words.",
    goals: frenchGoals,
    vocabulary: frenchVocabulary,
    phrases: frenchPhrases,
    activities: frenchActivities,
    aiTeacherPrompts: [
      {
        id: "fr-ai-1",
        prompt: "Introduce the basics of French greetings and encourage the learner to say 'bonjour' and 'merci'.",
        tone: "friendly",
        context: "intro lesson",
      },
    ],
  },
  {
    id: "french-lesson-2",
    unitId: "french-essentials",
    languageId: "french",
    slug: "mini-dialogue-french",
    title: "Mini Dialogue",
    type: "conversation",
    difficulty: "beginner",
    xpReward: 65,
    description: "Practice short conversations with a simple French exchange.",
    goals: [
      { id: "fr-goal-3", text: "Introduce yourself naturally in French." },
      { id: "fr-goal-4", text: "Ask and answer a simple question." },
    ],
    vocabulary: [
      ...frenchVocabulary,
      { id: "fr-vocab-4", word: "famille", translation: "family", pronunciation: "fah-MEE", category: "people" },
    ],
    phrases: [
      ...frenchPhrases,
      { id: "fr-phrase-3", phrase: "Ça va ?", translation: "How are you?", pronunciation: "sah vah" },
    ],
    activities: [
      ...frenchActivities,
      {
        id: "fr-activity-3",
        type: "translate",
        prompt: "Translate 'How are you?' into French.",
        instructions: "Keep it short and natural.",
        choices: ["Ça va ?", "Merci.", "Je suis faim."],
        answer: "Ça va ?",
      },
    ],
    aiTeacherPrompts: [
      {
        id: "fr-ai-2",
        prompt: "Roleplay a short French greeting and response, keeping the pace slow and encouraging.",
        tone: "supportive",
        context: "conversation drill",
      },
    ],
  },
  {
    id: "german-lesson-1",
    unitId: "german-essentials",
    languageId: "german",
    slug: "guten-tag-german",
    title: "Guten Tag",
    type: "core",
    difficulty: "beginner",
    xpReward: 50,
    description: "Begin with German greetings and common small-talk words.",
    goals: germanGoals,
    vocabulary: germanVocabulary,
    phrases: germanPhrases,
    activities: germanActivities,
    aiTeacherPrompts: [
      {
        id: "de-ai-1",
        prompt: "Warmly introduce the learner to simple German greetings and polite responses.",
        tone: "friendly",
        context: "beginner intro",
      },
    ],
  },
  {
    id: "german-lesson-2",
    unitId: "german-essentials",
    languageId: "german",
    slug: "quick-say-german",
    title: "Quick Say",
    type: "audio",
    difficulty: "beginner",
    xpReward: 60,
    description: "Practice saying common German phrases aloud and hearing them back clearly.",
    goals: [
      { id: "de-goal-3", text: "Say your name and how you are doing." },
      { id: "de-goal-4", text: "Use everyday phrases with confidence." },
    ],
    vocabulary: [
      ...germanVocabulary,
      { id: "de-vocab-4", word: "Freund", translation: "friend", pronunciation: "FROYNT", category: "people" },
    ],
    phrases: [
      ...germanPhrases,
      { id: "de-phrase-3", phrase: "Wie geht's?", translation: "How are you?", pronunciation: "vee GAYTS" },
    ],
    activities: [
      ...germanActivities,
      {
        id: "de-activity-3",
        type: "listen",
        prompt: "Listen to the German question and choose the correct response.",
        instructions: "Match the sound to the meaning.",
        choices: ["How are you?", "Good morning.", "I am hungry."],
        answer: "How are you?",
      },
    ],
    aiTeacherPrompts: [
      {
        id: "de-ai-2",
        prompt: "Guide the learner through a short German self-introduction and practice saying it aloud in a calm rhythm.",
        tone: "calm",
        context: "speech practice",
      },
    ],
  },
];

export const lessonsByLanguage = lessons.reduce<Record<string, Lesson[]>>((result, lesson) => {
  result[lesson.languageId] = result[lesson.languageId] ? [...result[lesson.languageId], lesson] : [lesson];
  return result;
}, {});

export const lessonMap = lessons.reduce<Record<string, Lesson>>((result, lesson) => {
  result[lesson.id] = lesson;
  return result;
}, {});

export const getLessonById = (lessonId: string) => lessonMap[lessonId];

export const getLessonsForLanguage = (languageId: string) => lessonsByLanguage[languageId] ?? [];
