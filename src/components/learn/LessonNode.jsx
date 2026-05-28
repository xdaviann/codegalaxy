// src/components/learn/LessonNode.jsx
import { Check, Play, Lock, Heart, Swords, Trophy } from 'lucide-react';

export default function LessonNode({
  lesson,
  status,
  onClick,
  index,
  noHearts,
  roundsCompleted = 0,
  moduleColor = '#00d4ff',
  zigzagX = 0,   // absolute x position used to decide label side
  containerCx = 160, // center x of the container
}) {
  const totalRounds = lesson.totalRounds ?? 3;
  const isBlocked = status === 'locked';
  const isChallenge = lesson.type === 'challenge';

  const handleClick = () => onClick();

  // ── Node style ──────────────────────────────────────────────────────────
  const nodeStyle = (() => {
    if (status === 'completed') {
      return `active:scale-90`;
    }
    if (status === 'current' && noHearts) {
      return 'border-4 border-accent-red/60 bg-bg-tertiary cursor-not-allowed opacity-80';
    }
    if (status === 'current') {
      return 'border-4 bg-bg-tertiary border-accent-cyan animate-pulse-glow active:scale-90 hover:shadow-cyan-glow cursor-pointer';
    }
    return 'bg-bg-tertiary border-2 border-text-muted opacity-50 cursor-pointer';
  })();

  const bgStyle = status === 'completed'
    ? { backgroundColor: moduleColor }
    : status === 'current'
    ? { borderColor: moduleColor }
    : {};

  // Label goes to the RIGHT if node is on left side of center, LEFT if on right side
  const labelOnRight = zigzagX <= containerCx;

  return (
    <div className="relative flex flex-col items-center gap-2" style={{ zIndex: 10 }}>
      {/* Side label with slide-in animation */}
      <div
        className={`
          absolute top-1/2 -translate-y-1/2 pointer-events-none
          ${labelOnRight ? 'left-full ml-3' : 'right-full mr-3'}
          flex items-center
        `}
        style={{
          animation: 'slideInLabel 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
          animationDelay: `${index * 60}ms`,
        }}
      >
        <div
          className="whitespace-nowrap text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
          style={{
            backgroundColor: status === 'completed'
              ? `${moduleColor}30`
              : status === 'current'
              ? moduleColor
              : '#2e3347',
            color: status === 'completed'
              ? moduleColor
              : status === 'current'
              ? '#0a0e1a'
              : '#6b7280',
            border: status === 'completed' ? `1px solid ${moduleColor}60` : 'none',
          }}
        >
          {lesson.title}
        </div>
      </div>

      {/* Main button */}
      <button
        id={`lesson-node-${lesson.id}`}
        onClick={handleClick}
        disabled={false}
        className={`relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${nodeStyle}`}
        style={bgStyle}
      >
        {/* Icon */}
        {status === 'completed' && !isChallenge && <Check size={36} strokeWidth={3} className="text-bg-primary" />}
        {status === 'completed' && isChallenge && <Trophy size={32} strokeWidth={2.5} className="text-bg-primary" />}
        
        {status === 'current' && !noHearts && !isChallenge && <Play size={28} className="fill-current ml-1" style={{ color: moduleColor }} />}
        {status === 'current' && noHearts && !isChallenge && <Heart size={28} className="text-accent-red" strokeWidth={1.5} />}
        {status === 'current' && isChallenge && <Swords size={28} className="text-accent-yellow" strokeWidth={2} />}

        {status === 'locked' && !isChallenge && <Lock size={28} className="text-text-muted" />}
        {status === 'locked' && isChallenge && <Swords size={28} className="text-text-muted" />}

        {/* Badge */}
        {status === 'completed' && (
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent-green text-white flex items-center justify-center text-xs font-bold">✓</div>
        )}
        {status === 'current' && !noHearts && !isChallenge && (
          <div
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-bg-primary flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: moduleColor }}
          >!</div>
        )}
        {status === 'current' && isChallenge && (
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent-yellow text-bg-primary flex items-center justify-center text-xs font-bold">!</div>
        )}
      </button>

      {/* Round progress dots */}
      {status !== 'locked' && !isChallenge && (
        <div className="flex items-center gap-1">
          {Array.from({ length: totalRounds }).map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i < roundsCompleted ? 14 : 8,
                height: 8,
                backgroundColor: i < roundsCompleted ? moduleColor : '#2e3347',
              }}
            />
          ))}
        </div>
      )}
      
      {/* Challenge text label under button */}
      {isChallenge && (
        <div className="text-xs font-bold text-accent-yellow uppercase tracking-widest mt-1">
          Desafío
        </div>
      )}
    </div>
  );
}
