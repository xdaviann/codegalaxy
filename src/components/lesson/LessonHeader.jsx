// src/components/lesson/LessonHeader.jsx
import { X, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function LessonHeader({ progress, totalExercises, currentExercise }) {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const hearts = userData?.hearts ?? 5;
  const progressPct = totalExercises > 0 ? (currentExercise / totalExercises) * 100 : 0;

  return (
    <div className="sticky top-0 z-30 bg-bg-primary border-b border-border-subtle safe-top">
      <div className="flex items-center gap-3 px-4 py-3 max-w-lg mx-auto">
        {/* Close button */}
        <button
          id="lesson-close-btn"
          onClick={() => navigate('/learn')}
          className="p-2 rounded-xl hover:bg-bg-tertiary transition-colors text-text-muted hover:text-text-primary"
        >
          <X size={22} />
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-3 bg-bg-tertiary rounded-full overflow-hidden">
          <div
            className="h-full bg-accent-cyan rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Heart
              key={i}
              size={20}
              className={`transition-all duration-300 ${
                i < hearts
                  ? 'text-accent-red fill-accent-red'
                  : 'text-text-muted fill-transparent'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
