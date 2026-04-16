// src/components/layout/TopBar.jsx
import { Heart, Flame, Coins } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useHeartRefill, formatCountdown } from '../../hooks/useHeartRefill';

export default function TopBar({ courseTitle }) {
  const { user, userData, refreshUserData } = useAuth();

  const hearts = userData?.hearts ?? 5;
  const maxHearts = userData?.maxHearts ?? 5;
  const streak = userData?.streak ?? 0;
  const coins = userData?.coins ?? 0;
  const isFull = hearts >= maxHearts;

  const { secondsLeft } = useHeartRefill(user, userData, refreshUserData);
  const countdown = formatCountdown(secondsLeft);

  return (
    <header className="sticky top-0 z-40 bg-bg-primary/95 backdrop-blur-sm border-b border-border-subtle safe-top">
      <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
        {/* Course selector */}
        <div className="flex items-center gap-2 bg-bg-tertiary rounded-full px-3 py-1.5 border border-border-subtle">
          <span className="text-text-primary text-sm font-semibold truncate max-w-[120px]">
            {courseTitle || 'Desarrollo Web'}
          </span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="#9fa3b1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2">
          {/* Hearts + countdown */}
          <div
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 border transition-colors
              ${isFull
                ? 'bg-bg-tertiary border-border-subtle'
                : 'bg-accent-red/10 border-accent-red/40'
              }`}
          >
            <Heart
              size={16}
              className={`transition-colors ${
                hearts > 0 ? 'text-accent-red fill-accent-red' : 'text-text-muted'
              }`}
            />
            <span className="text-text-primary text-sm font-bold">{hearts}</span>

            {/* Countdown — only shown when not full */}
            {!isFull && countdown && (
              <>
                <span className="text-text-muted text-xs">·</span>
                <span className="text-accent-red text-xs font-mono font-bold tabular-nums leading-none">
                  {countdown}
                </span>
              </>
            )}

            {/* MAX badge when completely full */}
            {isFull && (
              <span className="text-accent-green text-xs font-bold font-mono">MAX</span>
            )}
          </div>

          {/* Streak */}
          <div className="flex items-center gap-1.5 bg-bg-tertiary rounded-full px-3 py-1.5 border border-border-subtle">
            <Flame size={16} className="text-accent-orange fill-accent-orange" />
            <span className="text-text-primary text-sm font-bold">{streak}</span>
          </div>

          {/* Coins */}
          <div className="flex items-center gap-1.5 bg-bg-tertiary rounded-full px-3 py-1.5 border border-border-subtle">
            <Coins size={16} className="text-accent-gold" />
            <span className="text-text-primary text-sm font-bold">{coins}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
