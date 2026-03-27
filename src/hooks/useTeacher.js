import { useState, useEffect, useCallback } from "react";
import { loadJSON, saveJSON, STORAGE_KEYS } from "../utils/storage";
import { DEFAULT_QUIZ_BANK } from "../constants/defaultQuiz";

const DEFAULT_CATEGORY = {
  id: "cat_default",
  name: "ປະຫວັດສາດ",
  emoji: "📜",
  createdBy: "system",
};

function seedDefaultQuestions() {
  return DEFAULT_QUIZ_BANK.map((q, i) => ({
    id: `q_default_${i}`,
    categoryId: "cat_default",
    question: q.q,
    options: q.opts,
    correctIndex: q.c,
    coins: q.coins,
    createdBy: "system",
    isDefault: true,
  }));
}

export default function useTeacher() {
  const [teachers, setTeachers] = useState([]);
  const [currentTeacherId, setCurrentTeacherId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load on mount
  useEffect(() => {
    const t = loadJSON(STORAGE_KEYS.TEACHERS, []);
    setTeachers(t);

    let cats = loadJSON(STORAGE_KEYS.CATEGORIES, null);
    if (!cats) {
      cats = [DEFAULT_CATEGORY];
      saveJSON(STORAGE_KEYS.CATEGORIES, cats);
    }
    setCategories(cats);

    let qs = loadJSON(STORAGE_KEYS.QUESTIONS, null);
    if (!qs) {
      qs = seedDefaultQuestions();
      saveJSON(STORAGE_KEYS.QUESTIONS, qs);
    }
    setQuestions(qs);

    setLoaded(true);
  }, []);

  // Save teachers
  useEffect(() => {
    if (!loaded) return;
    saveJSON(STORAGE_KEYS.TEACHERS, teachers);
  }, [teachers, loaded]);

  // Save questions
  useEffect(() => {
    if (!loaded) return;
    saveJSON(STORAGE_KEYS.QUESTIONS, questions);
  }, [questions, loaded]);

  // Save categories
  useEffect(() => {
    if (!loaded) return;
    saveJSON(STORAGE_KEYS.CATEGORIES, categories);
  }, [categories, loaded]);

  const currentTeacher =
    teachers.find((t) => t.id === currentTeacherId) || null;

  // Teacher auth
  const registerTeacher = useCallback((name, pin) => {
    const id = `t_${Date.now()}`;
    const newT = { id, name, pin };
    setTeachers((prev) => [...prev, newT]);
    return id;
  }, []);

  const loginTeacher = useCallback(
    (name, pin) => {
      const t = teachers.find(
        (t) => t.name === name && t.pin === pin
      );
      if (t) {
        setCurrentTeacherId(t.id);
        return true;
      }
      return false;
    },
    [teachers]
  );

  const logoutTeacher = useCallback(() => {
    setCurrentTeacherId(null);
  }, []);

  // Category CRUD
  const addCategory = useCallback((name, emoji) => {
    const cat = {
      id: `cat_${Date.now()}`,
      name,
      emoji: emoji || "📚",
      createdBy: "teacher",
    };
    setCategories((prev) => [...prev, cat]);
    return cat;
  }, []);

  const deleteCategory = useCallback(
    (catId) => {
      if (catId === "cat_default") return false;
      setCategories((prev) => prev.filter((c) => c.id !== catId));
      // Move orphan questions to default category
      setQuestions((prev) =>
        prev.map((q) =>
          q.categoryId === catId ? { ...q, categoryId: "cat_default" } : q
        )
      );
      return true;
    },
    []
  );

  // Question CRUD
  const addQuestion = useCallback(
    (categoryId, question, options, correctIndex, coins) => {
      const q = {
        id: `q_${Date.now()}`,
        categoryId,
        question,
        options,
        correctIndex,
        coins: coins || 3,
        createdBy: currentTeacherId || "teacher",
        isDefault: false,
      };
      setQuestions((prev) => [...prev, q]);
      return q;
    },
    [currentTeacherId]
  );

  const editQuestion = useCallback((qId, updates) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === qId ? { ...q, ...updates } : q))
    );
  }, []);

  const deleteQuestion = useCallback((qId) => {
    setQuestions((prev) => prev.filter((q) => q.id !== qId));
  }, []);

  return {
    teachers,
    currentTeacher,
    currentTeacherId,
    loaded,
    registerTeacher,
    loginTeacher,
    logoutTeacher,
    questions,
    categories,
    addCategory,
    deleteCategory,
    addQuestion,
    editQuestion,
    deleteQuestion,
  };
}
