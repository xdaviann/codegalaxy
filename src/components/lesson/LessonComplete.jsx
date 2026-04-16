// src/components/lesson/LessonComplete.jsx
import { useNavigate } from 'react-router-dom';
import { Target, Star, Coins } from 'lucide-react';
import CodyMascot from '../ui/CodyMascot';

export default function LessonComplete({ lessonTitle, coinsEarned, xpEarned, accuracy }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-bg-primary z-50 flex flex-col items-center justify-center px-6 animate-fade-in">
      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        {/* Cody celebrating */}
        <div className="animate-bounce-in">
          <CodyMascot size={100} animate />
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-2">¡Excelente!</h2>
          <p className="text-text-secondary font-mono text-sm">{lessonTitle}</p>
        </div>

        {/* Stats cards */}
        <div className="w-full grid grid-cols-3 gap-3">
          <div className="card p-4 flex flex-col items-center gap-2">
            <Target size={28} className="text-accent-cyan" />
            <span className="text-accent-cyan font-bold text-lg">{accuracy}%</span>
            <span className="text-text-muted text-xs font-semibold">Precisión</span>
          </div>
          <div className="card p-4 flex flex-col items-center gap-2">
            <Star size={28} className="text-accent-gold fill-accent-gold" />
            <span className="text-accent-gold font-bold text-lg">+{xpEarned}</span>
            <span className="text-text-muted text-xs font-semibold">XP</span>
          </div>
          <div className="card p-4 flex flex-col items-center gap-2">
            <Coins size={28} className="text-accent-gold" />
            <span className="text-accent-gold font-bold text-lg">+{coinsEarned}</span>
            <span className="text-text-muted text-xs font-semibold">Monedas</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-3">
          <button
            id="continue-btn"
            onClick={() => navigate('/learn')}
            className="btn-primary"
          >
            Continuar
          </button>
          <button
            id="review-btn"
            onClick={() => navigate('/learn')}
            className="btn-secondary"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
