// src/components/layout/TopBar.jsx
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Flame, Coins, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useHeartRefill, formatCountdown } from '../../hooks/useHeartRefill';

export default function TopBar({
  courseTitle,
  courseOptions = [],
  selectedCourseId,
  onCourseChange,
}) {
  const { user, userData, refreshUserData } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const hearts    = userData?.hearts  ?? 5;
  const maxHearts = userData?.maxHearts ?? 5;
  const streak    = userData?.streak  ?? 0;
  const coins     = userData?.coins   ?? 0;
  const isFull    = hearts >= maxHearts;
  const hasSelector = courseOptions.length > 0 && typeof onCourseChange === 'function';
  const selectedOption = hasSelector
    ? courseOptions.find(o => o.id === selectedCourseId) || courseOptions[0]
    : null;

  const { secondsLeft } = useHeartRefill(user, userData, refreshUserData);
  const countdown = formatCountdown(secondsLeft);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => { if (!menuRef.current?.contains(e.target)) setMenuOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border safe-top">
      <div className="flex items-center justify-between px-3 sm:px-4 md:px-8 py-3 max-w-6xl mx-auto w-full gap-1 sm:gap-2">

        {/* Left — Logo + Course selector */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0" ref={menuRef}>
          {/* Cody logotype */}
          <div className="flex items-center gap-1.5 cursor-pointer">
            <div className="w-7 h-7 rounded-lg bg-gradient-accent flex items-center justify-center shadow-accent-sm shrink-0">
              <span className="text-white font-bold text-xs">C</span>
            </div>
            <span className="hidden min-[380px]:block font-bold text-text-primary text-base tracking-tight">Cody</span>
          </div>

          {hasSelector && (
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setMenuOpen(v => !v)}
                className="flex items-center gap-1 rounded-full px-2 sm:px-2.5 py-1 bg-bg-tertiary border border-border hover:border-accent/40 transition-colors text-text-secondary text-[11px] sm:text-xs font-semibold whitespace-nowrap"
              >
                <span className="truncate max-w-[90px] sm:max-w-none">{selectedOption?.label || courseTitle}</span>
                <ChevronDown size={12} className={`shrink-0 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} />
              </button>

              {menuOpen && (
                <div className="absolute top-full mt-2 left-0 w-48 rounded-2xl border border-border bg-white shadow-card-lg overflow-hidden animate-slide-down z-50">
                  <div className="px-3 pt-2.5 pb-1 text-[10px] uppercase tracking-widest text-text-muted font-bold">Módulo</div>
                  <div className="p-1.5">
                    {courseOptions.map(opt => {
                      const isActive = opt.id === selectedOption?.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => { onCourseChange(opt.id); setMenuOpen(false); }}
                          className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors text-sm font-semibold ${
                            isActive ? 'bg-accent-light text-accent' : 'text-text-secondary hover:bg-bg-tertiary'
                          }`}
                        >
                          {opt.label}
                          {isActive && <span className="w-2 h-2 rounded-full bg-accent" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right — Stats pills */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 overflow-x-auto no-scrollbar">
          {/* Hearts */}
          <button 
            onClick={() => navigate('/shop')}
            className={`flex items-center gap-1 rounded-full px-2 sm:px-2.5 py-1.5 border text-[11px] sm:text-xs font-bold transition-all shrink-0 hover:scale-105 active:scale-95 cursor-pointer ${
              isFull
                ? 'bg-bg-tertiary border-border text-text-secondary hover:bg-bg-secondary'
                : 'bg-accent-red-light border-accent-red/30 text-accent-red hover:bg-accent-red/20'
            }`}
          >
            <Heart size={13} className={hearts > 0 ? 'fill-accent-red text-accent-red' : 'text-text-muted'} />
            <span>{hearts}</span>
            {!isFull && countdown && <span className="text-[10px] font-mono opacity-80">·{countdown}</span>}
            {isFull && <span className="hidden min-[380px]:inline text-accent-green text-[10px] font-bold ml-0.5">MAX</span>}
          </button>

          {/* Streak */}
          <div className="flex items-center gap-1 bg-orange-50 border border-orange-200 rounded-full px-2 sm:px-2.5 py-1.5 text-[11px] sm:text-xs font-bold text-orange-600 shrink-0">
            <Flame size={13} className="fill-accent-orange text-accent-orange" />
            <span>{streak}</span>
          </div>

          {/* Coins */}
          <button 
            onClick={() => navigate('/shop')}
            className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 rounded-full px-2 sm:px-2.5 py-1.5 text-[11px] sm:text-xs font-bold text-yellow-600 shrink-0 hover:scale-105 active:scale-95 cursor-pointer hover:bg-yellow-100"
          >
            <Coins size={13} className="text-accent-gold" />
            <span>{coins}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
