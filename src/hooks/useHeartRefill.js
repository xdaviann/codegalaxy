// src/hooks/useHeartRefill.js
/**
 * Manages the heart refill countdown.
 *
 * Logic:
 * - One heart is refilled every REFILL_INTERVAL_MS (2 minutes).
 * - The countdown is based on `userData.lastHeartLostAt` (Firestore timestamp).
 * - Every second, recalculates secondsLeft from that anchor.
 * - When secondsLeft reaches 0, calls refillOneHeart() and refreshes userData.
 * - Shows "MAX" label when hearts are full.
 */
import { useEffect, useRef, useState } from 'react';
import { refillOneHeart } from '../firebase/firestore';

const REFILL_INTERVAL_MS = 2 * 60 * 1000; // 2 minutes

export function useHeartRefill(user, userData, refreshUserData) {
  // Countdown in seconds (null = full hearts / no timer)
  const [secondsLeft, setSecondsLeft] = useState(null);
  const timerRef = useRef(null);
  const refillInProgressRef = useRef(false);

  useEffect(() => {
    // Clear any existing interval
    if (timerRef.current) clearInterval(timerRef.current);

    const maxHearts = userData?.maxHearts ?? 5;
    const hearts = userData?.hearts ?? 5;

    // Hearts are full — no countdown needed
    if (!userData || hearts >= maxHearts) {
      setSecondsLeft(null);
      return;
    }

    // Get the anchor timestamp (when the last heart was lost)
    const lastLostRaw = userData?.lastHeartLostAt;
    if (!lastLostRaw) {
      setSecondsLeft(null);
      return;
    }

    // Convert Firestore Timestamp → JS Date
    const lastLostDate = lastLostRaw?.toDate
      ? lastLostRaw.toDate()
      : new Date(lastLostRaw);

    const tick = async () => {
      const elapsed = Date.now() - lastLostDate.getTime();
      const remaining = Math.max(0, Math.ceil((REFILL_INTERVAL_MS - elapsed) / 1000));
      setSecondsLeft(remaining);

      if (remaining <= 0 && !refillInProgressRef.current) {
        refillInProgressRef.current = true;
        clearInterval(timerRef.current);
        try {
          await refillOneHeart(user.uid);
          await refreshUserData(); // will trigger this useEffect again with new data
        } catch (e) {
          console.error('Error refilling heart:', e);
        } finally {
          refillInProgressRef.current = false;
        }
      }
    };

    // Run immediately then every second
    tick();
    timerRef.current = setInterval(tick, 1000);

    return () => clearInterval(timerRef.current);
  }, [
    userData?.hearts,
    userData?.maxHearts,
    // Stringify the timestamp so it only re-runs when the value actually changes
    userData?.lastHeartLostAt?.seconds,
    user?.uid,
  ]);

  return { secondsLeft };
}

// Utility: format seconds as "m:ss"
export function formatCountdown(seconds) {
  if (seconds === null || seconds === undefined) return null;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
