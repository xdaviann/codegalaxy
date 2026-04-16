// src/components/learn/LessonNode.jsx
import { Check, Play, Lock, Heart } from 'lucide-react';

export default function LessonNode({ lesson, status, onClick, index, noHearts }) {
  // A node is blocked if: (a) locked by curriculum, or (b) it's the current lesson and user has 0 hearts
  const isBlocked = status === 'locked' || (status === 'current' && noHearts);

  const handleClick = () => {
    if (!isBlocked) onClick();
  };

  // Visual style for each state
  const nodeStyle = (() => {
    if (status === 'completed') {
      return 'bg-accent-cyan shadow-cyan-glow hover:shadow-cyan-glow-lg active:scale-90';
    }
    if (status === 'current' && noHearts) {
      return 'bg-bg-tertiary border-4 border-accent-red/60 cursor-not-allowed opacity-80';
    }
    if (status === 'current') {
      return 'bg-bg-tertiary border-4 border-accent-cyan animate-pulse-glow active:scale-90 hover:shadow-cyan-glow';
    }
    return 'bg-bg-tertiary border-2 border-text-muted opacity-60 cursor-not-allowed';
  })();

  return (
    <div
      className={`relative flex items-center ${
        index % 2 === 0 ? 'justify-center' : index % 4 === 1 ? 'justify-end pr-8' : 'justify-start pl-8'
      }`}
      style={{ zIndex: 10 }}
    >
      <button
        id={`lesson-node-${lesson.id}`}
        onClick={handleClick}
        disabled={isBlocked}
        className={`relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${nodeStyle}`}
      >
        {status === 'completed' && (
          <Check size={36} strokeWidth={3} className="text-bg-primary" />
        )}
        {status === 'current' && !noHearts && (
          <Play size={28} className="text-accent-cyan fill-accent-cyan ml-1" />
        )}
        {status === 'current' && noHearts && (
          <Heart size={28} className="text-accent-red" strokeWidth={1.5} />
        )}
        {status === 'locked' && (
          <Lock size={28} className="text-text-muted" />
        )}

        {/* Badge */}
        {status === 'completed' && (
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent-green text-white flex items-center justify-center text-xs font-bold">
            ✓
          </div>
        )}
        {status === 'current' && !noHearts && (
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent-cyan text-bg-primary flex items-center justify-center text-xs font-bold">
            !
          </div>
        )}
      </button>

      {/* Tooltip */}
      <div
        className={`absolute pointer-events-none
          ${index % 2 === 0 ? 'top-full' : 'top-1/2 -translate-y-1/2'}
          ${index % 2 !== 0 ? (index % 4 === 1 ? 'right-32' : 'left-32') : ''}`}
      >
        {status === 'current' && !noHearts && (
          <div className="bg-accent-cyan text-bg-primary text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap shadow-cyan-glow mt-2">
            {lesson.title}
          </div>
        )}
        {status === 'current' && noHearts && (
          <div className="bg-accent-red/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap mt-2 flex items-center gap-1">
            <Heart size={10} className="fill-white" />
            Sin vidas
          </div>
        )}
      </div>
    </div>
  );
}
