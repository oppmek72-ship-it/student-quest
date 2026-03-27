import { useState, useEffect, useCallback, useRef } from "react";
import { dbListen, dbSet } from "../utils/firebase";
import { loadJSON, saveJSON, STORAGE_KEYS } from "../utils/storage";
import { GACHA_COST } from "../constants/pets";
import { DEFAULT_PIXEL_AVATAR, FREE_PIXEL_ITEMS } from "../constants/avatarPixel";
import { migrateAvatar, ensureAvatarDefaults } from "../utils/avatarMigration";
import {
  DEFAULT_BATTLE_FIELDS,
  BATTLE_XP_WIN, BATTLE_XP_LOSE,
  RATING_WIN, RATING_LOSE,
  XP_PER_LEVEL, MAX_LEVEL,
} from "../constants/battle";

function migrateStudent(s) {
  const m = ensureAvatarDefaults(migrateAvatar(s));
  if (m.battleLevel === undefined) {
    Object.assign(m, DEFAULT_BATTLE_FIELDS);
  }
  return m;
}

export default function useStudents() {
  const [students, setStudents] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const fromFirebase = useRef(false);

  // Load: Firebase listener (real-time sync) with localStorage fallback
  useEffect(() => {
    // Load cached data first for instant display
    const cached = loadJSON(STORAGE_KEYS.STUDENTS, []);
    if (cached.length > 0) {
      setStudents(cached.map(migrateStudent));
      setLoaded(true);
    }

    const unsub = dbListen("students", (data) => {
      const arr = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
      const migrated = arr.map(migrateStudent);
      fromFirebase.current = true;
      setStudents(migrated);
      setLoaded(true);
      // Cache locally
      saveJSON(STORAGE_KEYS.STUDENTS, migrated);
    });
    return unsub;
  }, []);

  // Save: write to Firebase when students change (skip if change came from Firebase)
  useEffect(() => {
    if (!loaded) return;
    if (fromFirebase.current) {
      fromFirebase.current = false;
      return;
    }
    dbSet("students", students);
    saveJSON(STORAGE_KEYS.STUDENTS, students);
  }, [students, loaded]);

  const currentStudent = students.find((s) => s.id === currentId) || null;

  const updateStudent = useCallback((id, fn) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? fn({ ...s }) : s)));
  }, []);

  const createStudent = useCallback((name, grade) => {
    const id = `s_${Date.now()}`;
    const newS = {
      id,
      name,
      grade,
      coins: 0,
      avatar: { ...DEFAULT_PIXEL_AVATAR },
      pets: [],
      activePetIndex: -1,
      ownedAvatarItems: [...FREE_PIXEL_ITEMS],
      quizCorrect: 0,
      redeemed: 0,
      ...DEFAULT_BATTLE_FIELDS,
    };
    setStudents((prev) => [...prev, newS]);
    return id;
  }, []);

  const login = useCallback((id) => {
    setCurrentId(id);
  }, []);

  const logout = useCallback(() => {
    setCurrentId(null);
  }, []);

  const addCoins = useCallback(
    (amount) => {
      if (!currentId) return;
      updateStudent(currentId, (s) => ({
        ...s,
        coins: Math.max(0, s.coins + amount),
      }));
    },
    [currentId, updateStudent]
  );

  const DAILY_QUIZ_LIMIT = 5;

  const handleQuizAnswer = useCallback(
    (coins) => {
      if (!currentId) return;
      const today = new Date().toDateString();
      updateStudent(currentId, (s) => {
        const isNewDay = s.lastQuizDate !== today;
        const answersToday = isNewDay ? 0 : (s.quizAnswersToday || 0);
        if (answersToday >= DAILY_QUIZ_LIMIT) return s;
        return {
          ...s,
          coins: s.coins + coins,
          quizCorrect: (s.quizCorrect || 0) + 1,
          quizAnswersToday: answersToday + 1,
          lastQuizDate: today,
        };
      });
    },
    [currentId, updateStudent]
  );

  const getQuizRemaining = useCallback(() => {
    const s = students.find((st) => st.id === currentId);
    if (!s) return DAILY_QUIZ_LIMIT;
    const today = new Date().toDateString();
    if (s.lastQuizDate !== today) return DAILY_QUIZ_LIMIT;
    return Math.max(0, DAILY_QUIZ_LIMIT - (s.quizAnswersToday || 0));
  }, [students, currentId]);

  const handleGacha = useCallback(
    (pet, setActive = false) => {
      if (!currentId) return;
      if (setActive) {
        updateStudent(currentId, (s) => {
          const idx = s.pets.findIndex(
            (p) => p.id === pet.id && p.stars === pet.stars
          );
          return { ...s, activePetIndex: idx >= 0 ? idx : s.activePetIndex };
        });
        return;
      }
      updateStudent(currentId, (s) => {
        const newPets = [...s.pets, { id: pet.id, stars: pet.stars }];
        return {
          ...s,
          coins: Math.max(0, s.coins - GACHA_COST),
          pets: newPets,
          activePetIndex: s.activePetIndex < 0 ? newPets.length - 1 : s.activePetIndex,
        };
      });
    },
    [currentId, updateStudent]
  );

  const handleShopBuy = useCallback(
    (item) => {
      if (!currentId) return;
      updateStudent(currentId, (s) => ({
        ...s,
        coins: Math.max(0, s.coins - item.cost),
        redeemed: (s.redeemed || 0) + 1,
      }));
    },
    [currentId, updateStudent]
  );

  const handleEquip = useCallback(
    (category, itemId, cost) => {
      if (!currentId) return;
      updateStudent(currentId, (s) => {
        const updated = { ...s };
        if (cost && !(s.ownedAvatarItems || []).includes(itemId)) {
          updated.coins = Math.max(0, s.coins - cost);
          updated.ownedAvatarItems = [...(s.ownedAvatarItems || []), itemId];
        }
        updated.avatar = { ...s.avatar, [category]: itemId };
        return updated;
      });
    },
    [currentId, updateStudent]
  );

  const handleEquipSet = useCallback(
    (setPieces, totalCost, missingIds) => {
      if (!currentId) return;
      updateStudent(currentId, (s) => {
        const updated = { ...s };
        if (totalCost > 0) {
          updated.coins = Math.max(0, s.coins - totalCost);
          updated.ownedAvatarItems = [
            ...new Set([...(s.ownedAvatarItems || []), ...missingIds]),
          ];
        }
        updated.avatar = { ...s.avatar, ...setPieces };
        return updated;
      });
    },
    [currentId, updateStudent]
  );

  const handleSlotWin = useCallback(
    (netAmount) => {
      if (!currentId) return;
      updateStudent(currentId, (s) => ({
        ...s,
        coins: Math.max(0, s.coins + netAmount),
      }));
    },
    [currentId, updateStudent]
  );

  const handlePetMerge = useCallback(
    (newPets, newActivePetIndex) => {
      if (!currentId) return;
      updateStudent(currentId, (s) => ({
        ...s,
        pets: newPets,
        activePetIndex:
          newActivePetIndex !== undefined
            ? newActivePetIndex
            : Math.min(s.activePetIndex, newPets.length - 1),
      }));
    },
    [currentId, updateStudent]
  );

  const adjustStudentCoins = useCallback((studentId, amount) => {
    updateStudent(studentId, (s) => ({
      ...s,
      coins: Math.max(0, s.coins + amount),
    }));
  }, [updateStudent]);

  const resetStudent = useCallback((studentId) => {
    updateStudent(studentId, (s) => ({
      ...s,
      coins: 0,
      pets: [],
      activePetIndex: -1,
      ownedAvatarItems: [...FREE_PIXEL_ITEMS],
      quizCorrect: 0,
      redeemed: 0,
      avatar: { ...DEFAULT_PIXEL_AVATAR },
      ...DEFAULT_BATTLE_FIELDS,
    }));
  }, [updateStudent]);

  const handleBuySkill = useCallback(
    (skillId, cost) => {
      if (!currentId) return;
      updateStudent(currentId, (s) => {
        if ((s.ownedSkills || []).includes(skillId)) return s;
        if (s.coins < cost) return s;
        return {
          ...s,
          coins: s.coins - cost,
          ownedSkills: [...(s.ownedSkills || []), skillId],
        };
      });
    },
    [currentId, updateStudent]
  );

  const handleEquipSkill = useCallback(
    (slotIndex, skillId) => {
      if (!currentId) return;
      updateStudent(currentId, (s) => {
        const slots = [...(s.equippedSkills || [null, null, null, null])];
        const existIdx = slots.indexOf(skillId);
        if (existIdx >= 0) slots[existIdx] = null;
        slots[slotIndex] = skillId;
        return { ...s, equippedSkills: slots };
      });
    },
    [currentId, updateStudent]
  );

  const handleBattleResult = useCallback(
    (winnerId, loserId) => {
      updateStudent(winnerId, (s) => {
        const newXP = (s.battleXP || 0) + BATTLE_XP_WIN;
        let newLevel = s.battleLevel || 1;
        let remainXP = newXP;
        while (remainXP >= XP_PER_LEVEL && newLevel < MAX_LEVEL) {
          remainXP -= XP_PER_LEVEL;
          newLevel++;
        }
        return {
          ...s,
          battleXP: remainXP,
          battleLevel: newLevel,
          arenaRating: Math.max(0, (s.arenaRating || 1000) + RATING_WIN),
          arenaWins: (s.arenaWins || 0) + 1,
          battleLog: [
            { vs: loserId, result: "win", date: Date.now() },
            ...(s.battleLog || []).slice(0, 9),
          ],
        };
      });
      updateStudent(loserId, (s) => {
        const newXP = (s.battleXP || 0) + BATTLE_XP_LOSE;
        let newLevel = s.battleLevel || 1;
        let remainXP = newXP;
        while (remainXP >= XP_PER_LEVEL && newLevel < MAX_LEVEL) {
          remainXP -= XP_PER_LEVEL;
          newLevel++;
        }
        return {
          ...s,
          battleXP: remainXP,
          battleLevel: newLevel,
          arenaRating: Math.max(0, (s.arenaRating || 1000) - RATING_LOSE),
          arenaLosses: (s.arenaLosses || 0) + 1,
          battleLog: [
            { vs: winnerId, result: "lose", date: Date.now() },
            ...(s.battleLog || []).slice(0, 9),
          ],
        };
      });
    },
    [updateStudent]
  );

  return {
    students,
    currentStudent,
    currentId,
    loaded,
    login,
    logout,
    createStudent,
    updateStudent,
    addCoins,
    handleQuizAnswer,
    handleGacha,
    handleShopBuy,
    handleEquip,
    handleEquipSet,
    handleSlotWin,
    handlePetMerge,
    adjustStudentCoins,
    resetStudent,
    handleBuySkill,
    handleEquipSkill,
    handleBattleResult,
    getQuizRemaining,
  };
}
