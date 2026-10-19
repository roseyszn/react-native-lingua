import type { Language } from "../types/learning";

export const supportedLanguages: Language[] = [
  {
    id: "spanish",
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "https://flagcdn.com/w20/es.png",
    accentColor: "#4ADE80",
    difficulty: "beginner",
    description: "A warm, practical language for travel, conversation, and beginner-friendly lessons.",
    learners: "28.4M",
  },
  {
    id: "french",
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "https://flagcdn.com/w20/fr.png",
    accentColor: "#60A5FA",
    difficulty: "beginner",
    description: "A beautiful, globally useful language with clear pronunciation patterns and everyday phrases.",
    learners: "19.4M",
  },
  {
    id: "japanese",
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "https://flagcdn.com/w20/jp.png",
    accentColor: "#F87171",
    difficulty: "beginner",
    description: "A rewarding language with a rich writing system and globally loved culture.",
    learners: "12.7M",
  },
  {
    id: "korean",
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "https://flagcdn.com/w20/kr.png",
    accentColor: "#F59E0B",
    difficulty: "beginner",
    description: "A modern language with expressive pronunciation and a fun learning rhythm.",
    learners: "9.3M",
  },
  {
    id: "german",
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "https://flagcdn.com/w20/de.png",
    accentColor: "#FBBF24",
    difficulty: "beginner",
    description: "A structured language with simple building blocks and a rewarding learning path.",
    learners: "8.1M",
  },
  {
    id: "chinese",
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "https://flagcdn.com/w20/cn.png",
    accentColor: "#F97316",
    difficulty: "beginner",
    description: "A vibrant language with useful everyday phrases and a memorable writing system.",
    learners: "7.4M",
  },
];

export const getLanguageById = (languageId: string) =>
  supportedLanguages.find((language) => language.id === languageId);

export const getLanguageByCode = (code: string) =>
  supportedLanguages.find((language) => language.code === code);
