import { useState, useEffect, useCallback, useRef } from "react";
import { dbListen, dbSet } from "../utils/firebase";
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

  const fromFB_teachers = useRef(false);
  const fromFB_questions = useRef(false);
  const fromFB_categories = useRef(false);
  const seeded = useRef(false);

  // Load from Firebase with localStorage fallback
  useEffect(() => {
    // Load cached data first
    const cachedT = loadJSON(STORAGE_KEYS.TEACHERS, []);
    const cachedC = loadJSON(STORAGE_KEYS.CATEGORIES, null);
    const cachedQ = loadJSON(STORAGE_KEYS.QUESTIONS, null);
    if (cachedT.length > 0) setTeachers(cachedT);
    if (cachedC) setCategories(cachedC);
    if (cachedQ) setQuestions(cachedQ);

    const unsub1 = dbListen("teachers", (data) => {
      const arr = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
      fromFB_teachers.current = true;
      setTeachers(arr);
      saveJSON(STORAGE_KEYS.TEACHERS, arr);
    });

    const unsub2 = dbListen("categories", (data) => {
      let arr = data ? (Array.isArray(data) ? data : Object.values(data)) : null;
      if (!arr || arr.length === 0) {
        if (!seeded.current) {
          seeded.current = true;
          arr = [DEFAULT_CATEGORY];
          dbSet("categories", arr);
        } else {
          arr = [DEFAULT_CATEGORY];
        }
      }
      fromFB_categories.current = true;
      setCategories(arr);
      saveJSON(STORAGE_KEYS.CATEGORIES, arr);
    });

    const unsub3 = dbListen("questions", (data) => {
      let arr = data ? (Array.isArray(data) ? data : Object.values(data)) : null;
      if (!arr || arr.length === 0) {
        if (!seeded.current) {
          arr = seedDefaultQuestions();
          dbSet("questions", arr);
        } else {
          arr = seedDefaultQuestions();
        }
      }
      fromFB_questions.current = true;
      setQuestions(arr);
      setLoaded(true);
      saveJSON(STORAGE_KEYS.QUESTIONS, arr);
    });

    // Mark loaded after a short delay if Firebase hasn't responded
    const timer = setTimeout(() => setLoaded(true), 1500);

    return () => {
      unsub1();
      unsub2();
      unsub3();
      clearTimeout(timer);
    };
  }, []);

  // Save teachers to Firebase
  useEffect(() => {
    if (!loaded) return;
    if (fromFB_teachers.current) { fromFB_teachers.current = false; return; }
    dbSet("teachers", teachers);
    saveJSON(STORAGE_KEYS.TEACHERS, teachers);
  }, [teachers, loaded]);

  // Save questions to Firebase
  useEffect(() => {
    if (!loaded) return;
    if (fromFB_questions.current) { fromFB_questions.current = false; return; }
    dbSet("questions", questions);
    saveJSON(STORAGE_KEYS.QUESTIONS, questions);
  }, [questions, loaded]);

  // Save categories to Firebase
  useEffect(() => {
    if (!loaded) return;
    if (fromFB_categories.current) { fromFB_categories.current = false; return; }
    dbSet("categories", categories);
    saveJSON(STORAGE_KEYS.CATEGORIES, categories);
  }, [categories, loaded]);

  const currentTeacher =
    teachers.find((t) => t.id === currentTeacherId) || null;

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
      setQuestions((prev) =>
        prev.map((q) =>
          q.categoryId === catId ? { ...q, categoryId: "cat_default" } : q
        )
      );
      return true;
    },
    []
  );

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
