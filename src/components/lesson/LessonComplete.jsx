import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Star, Coins, Flame } from 'lucide-react';
import CodyMascot from '../ui/CodyMascot';
import { playLessonCompleteSound } from '../../utils/audio';

export default function LessonComplete({ lessonTitle, coinsEarned, xpEarned, accuracy, streak = 1 }) {
  const navigate = useNavigate();
  const [showStreakModal, setShowStreakModal] = useState(true);

  useEffect(() => {
    playLessonCompleteSound();
  }, []);

  return (
    <div className="fixed inset-0 bg-bg-primary z-50 flex flex-col items-center justify-center px-6 animate-fade-in">
      {/* ── Modal de Racha Encendida ─────────────────────────────────── */}
      {showStreakModal && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-bg-secondary rounded-3xl p-6 md:p-8 w-full max-w-sm shadow-card-lg border-2 border-orange-500/40 text-center animate-scale-in relative overflow-hidden flex flex-col items-center">
            {/* Background Glow */}
            <div className="absolute -inset-10 bg-gradient-radial from-amber-500/20 via-orange-500/10 to-transparent pointer-events-none" />

            {/* Fire Badge Graphic */}
            <div className="relative mb-5 animate-bounce-in">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 flex items-center justify-center shadow-[0_0_40px_rgba(249,115,22,0.6)]">
                <Flame size={54} className="text-white fill-white animate-bounce-slow" />
              </div>
            </div>

            <span className="text-accent-orange text-xs font-mono font-black uppercase tracking-widest mb-1">
              ¡Hito Diario Alcanzado!
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-text-primary mb-2 tracking-tight">
              ¡Racha Encendida! 🔥
            </h3>
            
            <p className="text-text-secondary text-sm mb-6 leading-relaxed">
              ¡Completaste tu lección del día! Tu racha está activa y en llamas.
            </p>

            {/* Streak Counter Card */}
            <div className="w-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border border-orange-500/30 rounded-2xl p-4 flex items-center justify-center gap-3 mb-6 shadow-sm">
              <Flame size={28} className="text-accent-orange fill-accent-orange" />
              <div className="text-left">
                <p className="text-text-muted text-[10px] font-extrabold uppercase tracking-wider">Racha Actual</p>
                <p className="text-text-primary text-2xl font-black font-mono">
                  {streak} {streak === 1 ? 'DÍA' : 'DÍAS'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowStreakModal(false)}
              className="w-full py-4 rounded-2xl font-extrabold text-sm tracking-wide bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 active:scale-95 transition-all shadow-[0_0_25px_rgba(249,115,22,0.4)]"
            >
              ¡A por más! 🔥
            </button>
          </div>
        </div>
      )}

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
