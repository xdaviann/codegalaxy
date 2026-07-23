import { Flame } from 'lucide-react';

export default function StreakModal({ streak = 1, onClose }) {
  return (
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
          ¡Completaste tu primera ronda del día! Tu racha está activa y en llamas.
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
          onClick={onClose}
          className="w-full py-4 rounded-2xl font-extrabold text-sm tracking-wide bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 active:scale-95 transition-all shadow-[0_0_25px_rgba(249,115,22,0.4)]"
        >
          ¡A por más! 🔥
        </button>
      </div>
    </div>
  );
}
