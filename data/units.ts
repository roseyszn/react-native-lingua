import type { Unit } from "../types/learning";

export const units: Unit[] = [
  {
    id: "spanish-essentials",
    languageId: "spanish",
    title: "Spanish Essentials",
    description: "Build your first everyday Spanish phrases and core vocabulary.",
    order: 1,
    lessonIds: ["spanish-lesson-1", "spanish-lesson-2"],
  },
  {
    id: "spanish-travel",
    languageId: "spanish",
    title: "Travel Basics",
    description: "Learn the phrases you need when ordering, asking directions, and meeting people.",
    order: 2,
    lessonIds: ["spanish-lesson-3"],
  },
  {
    id: "french-essentials",
    languageId: "french",
    title: "French Foundations",
    description: "Start with greetings, daily words, and simple conversation patterns.",
    order: 1,
    lessonIds: ["french-lesson-1", "french-lesson-2"],
  },
  {
    id: "german-essentials",
    languageId: "german",
    title: "German Basics",
    description: "Get comfortable with pronunciation, greetings, and practical phrases.",
    order: 1,
    lessonIds: ["german-lesson-1", "german-lesson-2"],
  },
];

export const unitsByLanguage = units.reduce<Record<string, Unit[]>>((result, unit) => {
  result[unit.languageId] = result[unit.languageId] ? [...result[unit.languageId], unit] : [unit];
  return result;
}, {});
