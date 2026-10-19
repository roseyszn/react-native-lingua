export type LanguageCode = "es" | "fr" | "de" | "ja" | "ko" | "zh" | "it" | "pt";

export type LessonType = "core" | "conversation" | "audio" | "review";

export type LessonDifficulty = "beginner" | "intermediate";

export type ActivityType =
  | "match"
  | "listen"
  | "translate"
  | "pronunciation"
  | "conversation";

export type VocabularyItem = {
  id: string;
  word: string;
  translation: string;
  pronunciation?: string;
  example?: string;
  category: string;
};

export type PhraseItem = {
  id: string;
  phrase: string;
  translation: string;
  pronunciation?: string;
  context?: string;
};

export type LessonGoal = {
  id: string;
  text: string;
};

export type LessonPrompt = {
  id: string;
  prompt: string;
  tone: string;
  context: string;
};

export type LessonActivity = {
  id: string;
  type: ActivityType;
  prompt: string;
  instructions: string;
  choices?: string[];
  answer?: string;
};

export type Language = {
  id: string;
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  accentColor: string;
  difficulty: "beginner" | "intermediate";
  description: string;
  learners: string;
};

export type Unit = {
  id: string;
  languageId: string;
  title: string;
  description: string;
  order: number;
  lessonIds: string[];
};

export type Lesson = {
  id: string;
  unitId: string;
  languageId: string;
  slug: string;
  title: string;
  type: LessonType;
  difficulty: LessonDifficulty;
  xpReward: number;
  description: string;
  goals: LessonGoal[];
  vocabulary: VocabularyItem[];
  phrases: PhraseItem[];
  activities: LessonActivity[];
  aiTeacherPrompts: LessonPrompt[];
};
