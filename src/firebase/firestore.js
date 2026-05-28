// src/firebase/firestore.js
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  serverTimestamp,
  increment,
} from 'firebase/firestore';
import { db } from './config';

// Re-export primitives so consumers can import them from this module
export { db, doc, setDoc, getDoc, updateDoc, collection, getDocs, serverTimestamp, increment };

// Create user document on first sign-in/register
export const createUserDocument = async (user, extraData = {}) => {
  if (!user) return;
  const userRef = doc(db, 'users', user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { displayName, email, photoURL } = user;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await setDoc(userRef, {
      displayName: displayName || extraData.displayName || 'Estudiante',
      email,
      photoURL: photoURL || null,
      hearts: 5,
      maxHearts: 5,
      streak: 0,
      lastActivityDate: null,
      coins: 0,
      xp: 0,
      createdAt: serverTimestamp(),
      ...extraData,
    });
  }
};

// Get user data
export const getUserData = async (uid) => {
  const userRef = doc(db, 'users', uid);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) return null;

  const data = { id: snapshot.id, ...snapshot.data() };

  // Proactively check if streak is broken
  if (data.streak > 0 && data.lastActivityDate) {
    const lastActivity = data.lastActivityDate.toDate();
    const today = new Date();
    
    // Normalize to midnight to safely compare days
    lastActivity.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((today - lastActivity) / (1000 * 60 * 60 * 24));
    
    if (diffDays > 1) {
      // Streak broken because more than 1 day passed without activity
      data.streak = 0;
      // Update in background
      updateDoc(userRef, { streak: 0 }).catch(e => console.error('Error resetting streak:', e));
    }
  }

  return data;
};

// Update user stats
export const updateUserStats = async (uid, updates) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, updates);
};

// Save round progress for a lesson.
// roundsCompleted counts how many rounds finished (1, 2, 3).
// completed = true only when roundsCompleted >= totalRounds (default 3).
export const saveRoundProgress = async (uid, lessonId, moduleId, roundNum, score, totalRounds = 3) => {
  const progressRef = doc(db, 'users', uid, 'progress', lessonId);
  const roundsCompleted = roundNum; // roundNum is 1-based: completing round 1 → roundsCompleted=1
  const completed = roundsCompleted >= totalRounds;
  await setDoc(progressRef, {
    lessonId,
    moduleId,
    roundsCompleted,
    completed,
    score,
    updatedAt: serverTimestamp(),
  }, { merge: true });
  return { roundsCompleted, completed };
};

// Legacy alias (kept for backward compat)
export const saveLessonProgress = saveRoundProgress;


// Get all lesson progress for a user
export const getUserProgress = async (uid) => {
  const progressRef = collection(db, 'users', uid, 'progress');
  const snapshot = await getDocs(progressRef);
  const progress = {};
  snapshot.forEach((docSnap) => {
    progress[docSnap.id] = docSnap.data();
  });
  return progress;
};

// Update streak logic
export const updateStreak = async (uid) => {
  const userRef = doc(db, 'users', uid);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) return;

  const data = snapshot.data();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastActivity = data.lastActivityDate?.toDate?.();
  let newStreak = data.streak || 0;

  if (!lastActivity) {
    newStreak = 1;
  } else {
    const lastDate = new Date(lastActivity);
    lastDate.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Same day, don't update streak
      return data;
    } else if (diffDays === 1) {
      newStreak = (data.streak || 0) + 1;
    } else {
      newStreak = 1; // Streak broken
    }
  }

  await updateDoc(userRef, {
    streak: newStreak,
    lastActivityDate: serverTimestamp(),
  });

  return { ...data, streak: newStreak };
};

// Deduct heart — saves timestamp for refill countdown
export const deductHeart = async (uid) => {
  const userRef = doc(db, 'users', uid);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) return 0;

  const data = snapshot.data();
  const hearts = Math.max(0, (data.hearts || 0) - 1);
  const maxHearts = data.maxHearts || 5;

  const updates = { hearts };
  // Only set lastHeartLostAt if this is the first heart lost (was full before)
  if (data.hearts >= maxHearts || !data.lastHeartLostAt) {
    updates.lastHeartLostAt = serverTimestamp();
  }

  await updateDoc(userRef, updates);
  return hearts;
};

// Refill one heart (called by the client timer)
export const refillOneHeart = async (uid) => {
  const userRef = doc(db, 'users', uid);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) return null;

  const data = snapshot.data();
  const maxHearts = data.maxHearts || 5;
  const currentHearts = data.hearts || 0;

  if (currentHearts >= maxHearts) return data; // already full, nothing to do

  const newHearts = currentHearts + 1;
  const updates = {
    hearts: newHearts,
    // Reset timer: if still not full, mark now as the next refill start
    lastHeartLostAt: newHearts < maxHearts ? serverTimestamp() : null,
  };

  await updateDoc(userRef, updates);
  return { ...data, ...updates, hearts: newHearts };
};

// Award coins and XP on lesson completion
export const awardLessonRewards = async (uid, coinsEarned = 10, xpEarned = 15) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    coins: increment(coinsEarned),
    xp: increment(xpEarned),
  });
};
