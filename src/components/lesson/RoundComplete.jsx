import { useState } from 'react';
import { Trophy, Star, ChevronRight, Home } from 'lucide-react';
import StreakModal from '../ui/StreakModal';

const ROUND_META = [
  { label: 'Aprendiendo', emoji: '🌱', color: '#00d4ff' },
  { label: 'Practicando', emoji: '🔥', color: '#f39c12' },
  { label: 'Dominando',   emoji: '⭐', color: '#9b59b6' },
];

export default function RoundComplete({
  roundNum,       // 1 | 2 | 3
  totalRounds,    // always 3
  lessonTitle,
  coinsEarned,
  xpEarned,
  accuracy,
  streak = 1,
  streakJustIgnited = false,
  onContinue,     // start next round immediately
  onGoHome,       // back to /learn
}) {
  const [showStreakModal, setShowStreakModal] = useState(streakJustIgnited);
  const meta = ROUND_META[roundNum - 1] ?? ROUND_META[0];
  const isLastRound = roundNum >= totalRounds;

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col items-center justify-between px-6 py-10 animate-fade-in">
      {showStreakModal && (
        <StreakModal streak={streak} onClose={() => setShowStreakModal(false)} />
      )}

      {/* Top: round dots */}
      <div className="flex items-center gap-2 mt-2">
        {Array.from({ length: totalRounds }).map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width: i < roundNum ? 28 : 10,
              height: 10,
              backgroundColor: i < roundNum ? meta.color : '#2e3347',
            }}
          />
        ))}
      </div>

      {/* Center: celebration */}
      <div className="flex flex-col items-center gap-5 text-center">
        {/* Icon */}
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center text-5xl"
          style={{
            backgroundColor: `${meta.color}18`,
            boxShadow: `0 0 48px ${meta.color}30`,
          }}
        >
          {meta.emoji}
        </div>

        {/* Texts */}
        <div>
          <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: meta.color }}>
            Ronda {roundNum} de {totalRounds} completada
          </p>
          <h2 className="text-3xl font-bold text-text-primary mb-1">
            {isLastRound ? '¡Lección dominada!' : `¡Ronda ${roundNum} superada!`}
          </h2>
          <p className="text-text-secondary text-sm">{lessonTitle}</p>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center bg-bg-secondary rounded-2xl px-5 py-3 border border-border-subtle">
            <span className="text-xs text-text-muted font-mono uppercase tracking-wider">XP</span>
            <span className="text-xl font-bold text-accent-cyan">+{xpEarned}</span>
          </div>
          <div className="flex flex-col items-center bg-bg-secondary rounded-2xl px-5 py-3 border border-border-subtle">
            <span className="text-xs text-text-muted font-mono uppercase tracking-wider">Monedas</span>
            <span className="text-xl font-bold text-yellow-400">+{coinsEarned}</span>
          </div>
          <div className="flex flex-col items-center bg-bg-secondary rounded-2xl px-5 py-3 border border-border-subtle">
            <span className="text-xs text-text-muted font-mono uppercase tracking-wider">Precisión</span>
            <span className="text-xl font-bold text-accent-green">{accuracy}%</span>
          </div>
        </div>

        {/* Next round preview */}
        {!isLastRound && (
          <div
            className="w-full max-w-xs rounded-2xl p-4 border"
            style={{ backgroundColor: `${ROUND_META[roundNum].color}10`, borderColor: `${ROUND_META[roundNum].color}30` }}
          >
            <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: ROUND_META[roundNum].color }}>
              Siguiente ronda
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xl">{ROUND_META[roundNum].emoji}</span>
              <p className="text-text-primary font-semibold text-sm">
                Ronda {roundNum + 1}: {ROUND_META[roundNum].label}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom: buttons */}
      <div className="w-full max-w-sm flex flex-col gap-3">
        {!isLastRound ? (
          <>
            <button
              id="round-continue-btn"
              onClick={onContinue}
              className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
              style={{ backgroundColor: meta.color, color: '#1a1e2e' }}
            >
              Siguiente ronda
              <ChevronRight size={20} />
            </button>
            <button
              id="round-home-btn"
              onClick={onGoHome}
              className="w-full py-3 rounded-2xl font-semibold text-sm text-text-secondary border border-border-subtle hover:border-text-muted transition-colors flex items-center justify-center gap-2"
            >
              <Home size={16} />
              Volver al inicio
            </button>
          </>
        ) : (
          <button
            id="round-home-final-btn"
            onClick={onGoHome}
            className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
            style={{ backgroundColor: meta.color, color: '#1a1e2e' }}
          >
            <Trophy size={20} />
            ¡Al inicio!
          </button>
        )}
      </div>
    </div>
  );
}
