// src/components/lesson/NoHeartsScreen.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { formatCountdown } from '../../hooks/useHeartRefill';

const AUTO_EXIT_SECONDS = 5;

export default function NoHeartsScreen({ secondsLeft }) {
  const navigate = useNavigate();
  const [navigated, setNavigated] = useState(false);
  const [autoExit, setAutoExit] = useState(AUTO_EXIT_SECONDS);

  // Auto-exit countdown
  useEffect(() => {
    if (autoExit <= 0 && !navigated) {
      setNavigated(true);
      navigate('/learn');
      return;
    }
    if (autoExit > 0) {
      const t = setTimeout(() => setAutoExit((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [autoExit, navigated, navigate]);

  const nextHeartIn = formatCountdown(secondsLeft);

  return (
    <div className="fixed inset-0 z-50 bg-bg-primary flex flex-col items-center justify-center px-6 animate-fade-in">
      {/* Broken heart animation */}
      <div className="relative mb-6 animate-bounce-in">
        <div className="w-28 h-28 rounded-full bg-accent-red/10 border-2 border-accent-red/30 flex items-center justify-center">
          <Heart
            size={56}
            className="text-accent-red"
            strokeWidth={1.5}
          />
        </div>
        {/* X overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-0.5 bg-accent-red rotate-45 rounded-full opacity-70" />
          <div className="absolute w-16 h-0.5 bg-accent-red -rotate-45 rounded-full opacity-70" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-text-primary text-center mb-2">
        ¡Sin vidas!
      </h2>
      <p className="text-text-secondary font-mono text-sm text-center mb-8 leading-relaxed max-w-xs">
        Se te acabaron los corazones. Espera a que se recarguen para continuar practicando.
      </p>

      {/* Next heart countdown */}
      {nextHeartIn && (
        <div className="bg-bg-secondary border border-accent-red/30 rounded-2xl px-6 py-4 flex items-center gap-3 mb-8">
          <Heart size={20} className="text-accent-red" />
          <div>
            <p className="text-text-muted text-xs font-mono uppercase tracking-wider">
              Próxima vida en
            </p>
            <p className="text-accent-red text-2xl font-bold font-mono tabular-nums">
              {nextHeartIn}
            </p>
          </div>
        </div>
      )}

      {/* Auto-exit info */}
      <p className="text-text-muted text-xs font-mono mb-6">
        Volviendo al inicio en{' '}
        <span className="text-text-secondary font-bold">{autoExit}s</span>...
      </p>

      <button
        id="no-hearts-exit-btn"
        onClick={() => {
          if (!navigated) {
            setNavigated(true);
            navigate('/learn');
          }
        }}
        className="btn-primary max-w-xs w-full"
      >
        Volver al inicio
      </button>
    </div>
  );
}
