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
  query,
  orderBy,
  limit,
  where,
  getCountFromServer,
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
      const shields = data.streakShields || 0;
      if (shields > 0) {
        // Streak Shield protects the streak!
        const newShields = shields - 1;
        data.streakShields = newShields;
        
        // Set last activity to yesterday so the streak remains active today
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        data.lastActivityDate = yesterday;
        
        updateDoc(userRef, {
          streakShields: newShields,
          lastActivityDate: yesterday
        }).catch(e => console.error('Error consuming streak shield:', e));
      } else {
        // Streak broken because more than 1 day passed without activity
        data.streak = 0;
        // Update in background
        updateDoc(userRef, { streak: 0 }).catch(e => console.error('Error resetting streak:', e));
      }
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

// Define list of game achievements
export const ACHIEVEMENTS = [
  {
    id: 'ACH_FIRST',
    title: 'Primeros Pasos',
    description: 'Completa tu primera ronda de lección',
    icon: 'Zap',
    gradient: 'from-blue-500 to-indigo-500',
    xpReward: 50,
    coinsReward: 50,
  },
  {
    id: 'ACH_STREAK_3',
    title: 'Fuego Sagrado',
    description: 'Mantén una racha de 3 días',
    icon: 'Flame',
    gradient: 'from-orange-500 to-red-500',
    xpReward: 75,
    coinsReward: 75,
  },
  {
    id: 'ACH_STREAK_7',
    title: 'Constancia Imparable',
    description: 'Mantén una racha de 7 días',
    icon: 'Flame',
    gradient: 'from-red-500 to-yellow-500 animate-pulse',
    xpReward: 150,
    coinsReward: 150,
  },
  {
    id: 'ACH_PERFECT',
    title: 'Ejecución Perfecta',
    description: 'Termina una ronda con 100% de precisión',
    icon: 'Award',
    gradient: 'from-yellow-400 to-orange-500',
    xpReward: 100,
    coinsReward: 100,
  },
  {
    id: 'ACH_SHIELD',
    title: 'Escudo Protector',
    description: 'Compra un Escudo de Racha en la Tienda',
    icon: 'Shield',
    gradient: 'from-cyan-500 to-blue-600',
    xpReward: 50,
    coinsReward: 50,
  },
  {
    id: 'ACH_MODULES',
    title: 'Maestro de Módulos',
    description: 'Completa un módulo completo (HTML o CSS)',
    icon: 'BookOpen',
    gradient: 'from-green-400 to-emerald-600',
    xpReward: 200,
    coinsReward: 200,
  }
];

// Check and unlock achievements dynamically
export const checkAndUnlockAchievements = async (uid) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return [];

  const userData = userSnap.data();
  const progress = await getUserProgress(uid);

  const unlocked = userData.unlockedAchievements || [];
  const newUnlocked = [];

  // Check 1: ACH_FIRST
  if (!unlocked.includes('ACH_FIRST')) {
    const hasCompletedAny = Object.values(progress).some(p => p.roundsCompleted > 0 || p.completed);
    if (hasCompletedAny) newUnlocked.push('ACH_FIRST');
  }

  // Check 2: ACH_STREAK_3
  if (!unlocked.includes('ACH_STREAK_3')) {
    if ((userData.streak || 0) >= 3) newUnlocked.push('ACH_STREAK_3');
  }

  // Check 3: ACH_STREAK_7
  if (!unlocked.includes('ACH_STREAK_7')) {
    if ((userData.streak || 0) >= 7) newUnlocked.push('ACH_STREAK_7');
  }

  // Check 4: ACH_PERFECT
  if (!unlocked.includes('ACH_PERFECT')) {
    const hasPerfectRound = Object.values(progress).some(p => p.score === 100);
    if (hasPerfectRound) newUnlocked.push('ACH_PERFECT');
  }

  // Check 5: ACH_SHIELD
  if (!unlocked.includes('ACH_SHIELD')) {
    if ((userData.streakShields || 0) > 0 || userData.boughtShieldOnce === true) {
      newUnlocked.push('ACH_SHIELD');
    }
  }

  // Check 6: ACH_MODULES
  if (!unlocked.includes('ACH_MODULES')) {
    // HTML module 'html-1' lessons: html-1-1, html-1-2, html-1-3, html-1-4
    // CSS module 'css-1' lessons: css-1-1, css-1-2, css-1-3
    const htmlLessons = ['html-1-1', 'html-1-2', 'html-1-3', 'html-1-4'];
    const cssLessons = ['css-1-1', 'css-1-2', 'css-1-3'];

    const htmlCompleted = htmlLessons.every(id => progress[id]?.completed);
    const cssCompleted = cssLessons.every(id => progress[id]?.completed);

    if (htmlCompleted || cssCompleted) {
      newUnlocked.push('ACH_MODULES');
    }
  }

  if (newUnlocked.length > 0) {
    let xpAwarded = 0;
    let coinsAwarded = 0;
    
    newUnlocked.forEach(id => {
      const ach = ACHIEVEMENTS.find(a => a.id === id);
      if (ach) {
        xpAwarded += ach.xpReward;
        coinsAwarded += ach.coinsReward;
      }
    });

    const updatedUnlocked = [...unlocked, ...newUnlocked];
    await updateDoc(userRef, {
      unlockedAchievements: updatedUnlocked,
      xp: increment(xpAwarded),
      coins: increment(coinsAwarded)
    });
    
    return newUnlocked;
  }

  return [];
};

// Buy items from the shop
export const buyShopItem = async (uid, itemType) => {
  const userRef = doc(db, 'users', uid);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) throw new Error('Usuario no encontrado');

  const userData = snapshot.data();
  const coins = userData.coins || 0;
  const currentHearts = userData.hearts || 0;
  const maxHearts = userData.maxHearts || 5;
  const currentShields = userData.streakShields || 0;

  if (itemType === 'heart_refill') {
    const cost = 100;
    if (coins < cost) throw new Error('Monedas insuficientes');
    if (currentHearts >= maxHearts) throw new Error('Tus vidas ya están llenas');

    await updateDoc(userRef, {
      coins: increment(-cost),
      hearts: maxHearts,
      lastHeartLostAt: null
    });
    
    // Check achievements (buying might unlock shield achievement if they bought shield, but we also check here just in case)
    await checkAndUnlockAchievements(uid);
    
    return { success: true, item: 'heart_refill', cost };
  } else if (itemType === 'streak_shield') {
    const cost = 300;
    if (coins < cost) throw new Error('Monedas insuficientes');
    if (currentShields >= 1) throw new Error('Ya posees un escudo de racha');

    await updateDoc(userRef, {
      coins: increment(-cost),
      streakShields: 1,
      boughtShieldOnce: true
    });
    
    // Check achievements
    await checkAndUnlockAchievements(uid);
    
    return { success: true, item: 'streak_shield', cost };
  } else {
    throw new Error('Artículo no válido');
  }
};

// Get top users by XP (returns ALL users sorted by XP descending in-memory)
export const getTopUsers = async () => {
  try {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    const topUsers = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      topUsers.push({
        id: docSnap.id,
        name: data.displayName || 'Estudiante',
        xp: data.xp || 0,
        streak: data.streak || 0,
        photoURL: data.photoURL || null,
      });
    });
    // Sort by XP descending in-memory
    topUsers.sort((a, b) => b.xp - a.xp);
    return topUsers;
  } catch (error) {
    console.error('Error fetching top users:', error);
    return [];
  }
};

// Get exact user rank relative to other users
export const getUserRank = async (uid, xp) => {
  try {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    const allUsers = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      allUsers.push({
        id: docSnap.id,
        xp: data.xp || 0,
      });
    });
    allUsers.sort((a, b) => b.xp - a.xp);
    const rank = allUsers.findIndex((u) => u.id === uid) + 1;
    return rank || 1;
  } catch (error) {
    console.error('Error getting user rank:', error);
    return 1;
  }
};
