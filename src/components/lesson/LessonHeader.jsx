// src/components/lesson/LessonHeader.jsx
import { X, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function LessonHeader({ totalExercises, currentExercise, onClose }) {
  const navigate  = useNavigate();
  const { userData } = useAuth();
  const hearts = userData?.hearts ?? 5;
  const pct    = totalExercises > 0 ? (currentExercise / totalExercises) * 100 : 0;

  return (
    <div className="sticky top-0 z-30 bg-white border-b border-border safe-top shadow-card">
      <div className="flex items-center gap-3 px-4 py-3 max-w-lg mx-auto">
        {/* Close */}
        <button
          id="lesson-close-btn"
          onClick={() => onClose ? onClose() : navigate('/learn')}
          className="p-2 rounded-xl hover:bg-bg-tertiary transition-colors text-text-muted hover:text-text-primary flex-shrink-0"
        >
          <X size={20} />
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-2.5 bg-bg-tertiary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Hearts — compact */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <Heart
              key={i}
              size={16}
              className={`transition-all duration-300 ${
                i < hearts ? 'text-accent-red fill-accent-red' : 'text-border fill-border'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
