export const STORAGE_KEYS = {
  STUDENTS: "sq_students",
  TEACHERS: "sq_teachers",
  QUESTIONS: "sq_questions",
  CATEGORIES: "sq_categories",
};

export function loadJSON(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage full or unavailable
  }
}
