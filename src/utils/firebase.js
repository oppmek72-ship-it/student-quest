import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, off } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCf9oqPgqXGwFrObDLQMrGEAPaBObWLSC4",
  authDomain: "student-quest-16de7.firebaseapp.com",
  databaseURL: "https://student-quest-16de7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "student-quest-16de7",
  storageBucket: "student-quest-16de7.firebasestorage.app",
  messagingSenderId: "681745475480",
  appId: "1:681745475480:web:d338748b366908eb286ded",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export function dbRef(path) {
  return ref(db, path);
}

export function dbSet(path, data) {
  return set(ref(db, path), data);
}

export function dbListen(path, callback) {
  const r = ref(db, path);
  onValue(r, (snapshot) => {
    callback(snapshot.val());
  });
  return () => off(r);
}
