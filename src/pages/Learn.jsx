// src/pages/Learn.jsx
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import TopBar from '../components/layout/TopBar';
import MainLayout from '../components/layout/MainLayout';
import ModuleAccordion from '../components/learn/ModuleAccordion';
import { curriculum } from '../data/curriculum';
import { Flame, Zap, BookOpen, Sparkles, Trophy } from 'lucide-react';

const TRACKS = [
  { id: 'web', label: 'Desarrollo web', languages: ['HTML', 'CSS'] },
  { id: 'js',  label: 'JavaScript',     languages: ['JS'] },
  { id: 'py',  label: 'Python',         languages: ['PY'] },
];

export default function Learn() {
  const { userData } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTrack, setActiveTrack] = useState(
    TRACKS.some(t => t.id === searchParams.get('track'))
      ? searchParams.get('track')
      : 'web'
  );

  const handleTrackChange = (id) => {
    setActiveTrack(id);
    setSearchParams({ track: id }, { replace: true });
  };

  const visibleModules = useMemo(
    () => curriculum.filter(m => TRACKS.find(t => t.id === activeTrack)?.languages.includes(m.language)),
    [activeTrack],
  );

  const firstName = userData?.displayName?.split(' ')[0] || 'Coder';
  const streak    = userData?.streak ?? 0;
  const xp        = userData?.xp ?? 0;
  const level     = Math.floor(xp / 100) + 1;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? '¡Buenos días' : hour < 19 ? '¡Buenas tardes' : '¡Buenas noches';

  return (
    <MainLayout>
      <TopBar
        courseTitle={TRACKS.find(t => t.id === activeTrack)?.label}
        courseOptions={TRACKS}
        selectedCourseId={activeTrack}
        onCourseChange={handleTrackChange}
      />

      <main className="flex-1 overflow-y-auto w-full">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-start gap-8 pt-6 pb-28 lg:pb-12">
          
          {/* Main Column (Welcome + Modules) */}
          <div className="flex-1 w-full max-w-2xl mx-auto lg:mx-0">
            {/* ── Welcome section ──────────────────────────────────────── */}
            <div className="pb-6 animate-fade-in-up">
              <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary leading-tight">
                {greeting}, <span className="text-gradient">{firstName}</span>! 👋
              </h1>
              <p className="text-text-muted text-sm md:text-base mt-1">
                {streak > 0
                  ? `Llevas ${streak} días de racha. ¡No la rompas!`
                  : 'Aprende a tu ritmo, lección a lección.'}
              </p>
            </div>

            {/* ── Stats row (Mobile/Tablet only) ────────────────────────── */}
            <div className="lg:hidden grid grid-cols-3 gap-2.5 mb-6 animate-fade-in-up" style={{ animationDelay: '60ms', animationFillMode: 'both' }}>
              <div className="card px-3 py-3 flex flex-col gap-1 hover:shadow-card-md transition-shadow">
                <div className="flex items-center gap-1.5">
                  <Flame size={15} className="text-accent-orange fill-accent-orange" />
                  <span className="text-text-muted text-xs font-semibold">Racha</span>
                </div>
                <span className="text-text-primary font-extrabold text-lg md:text-xl">{streak}<span className="text-xs md:text-sm font-semibold text-text-muted ml-1">días</span></span>
              </div>
              <div className="card px-3 py-3 flex flex-col gap-1 hover:shadow-card-md transition-shadow">
                <div className="flex items-center gap-1.5">
                  <Zap size={15} className="text-accent fill-accent" />
                  <span className="text-text-muted text-xs font-semibold">XP Total</span>
                </div>
                <span className="text-text-primary font-extrabold text-lg md:text-xl">{xp}</span>
              </div>
              <div className="card px-3 py-3 flex flex-col gap-1 hover:shadow-card-md transition-shadow">
                <div className="flex items-center gap-1.5">
                  <BookOpen size={15} className="text-accent-green" />
                  <span className="text-text-muted text-xs font-semibold">Nivel</span>
                </div>
                <span className="text-text-primary font-extrabold text-lg md:text-xl">{level}</span>
              </div>
            </div>

            {/* ── Module accordions ─────────────────────────────────────── */}
            <div className="flex items-center gap-2 mb-4" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
              <Sparkles size={16} className="text-accent" />
              <h2 className="text-text-primary font-bold text-sm md:text-base uppercase tracking-wide">Módulos</h2>
            </div>

            <div className="flex flex-col gap-4 animate-fade-in-up" style={{ animationDelay: '120ms', animationFillMode: 'both' }}>
              {visibleModules.length > 0 ? (
                visibleModules.map((module, i) => (
                  <ModuleAccordion
                    key={module.id}
                    module={module}
                    defaultOpen={i === 0}
                  />
                ))
              ) : (
                <div className="card p-8 text-center bg-white/50 border-dashed">
                  <p className="text-text-muted text-sm md:text-base font-semibold">
                    Próximamente — ¡Estamos preparando este módulo!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── Right Floating Column (Desktop only) ────────────────────── */}
          <div className="hidden lg:flex flex-col gap-4 w-[320px] sticky top-24 shrink-0 animate-fade-in-up" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
            <div className="card p-6 shadow-card-md">
              <h3 className="font-bold text-text-primary uppercase tracking-wide text-sm border-b border-border pb-4 mb-4 flex items-center gap-2">
                <Trophy size={16} className="text-accent-gold" />
                Tu Progreso
              </h3>
              
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 group-hover:scale-110 transition-transform">
                      <Flame size={20} className="text-accent-orange fill-accent-orange" />
                    </div>
                    <span className="text-text-secondary font-semibold">Racha actual</span>
                  </div>
                  <span className="text-text-primary font-extrabold text-lg">{streak}</span>
                </div>

                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100 group-hover:scale-110 transition-transform">
                      <Zap size={20} className="text-accent fill-accent" />
                    </div>
                    <span className="text-text-secondary font-semibold">XP Total</span>
                  </div>
                  <span className="text-text-primary font-extrabold text-lg">{xp}</span>
                </div>

                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center border border-green-100 group-hover:scale-110 transition-transform">
                      <BookOpen size={20} className="text-accent-green" />
                    </div>
                    <span className="text-text-secondary font-semibold">Nivel</span>
                  </div>
                  <span className="text-text-primary font-extrabold text-lg">{level}</span>
                </div>
              </div>
            </div>
            
            <div className="card p-5 bg-gradient-to-br from-accent-light/30 to-transparent border-accent/20">
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Consejo del día</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Repasa las lecciones anteriores si sientes que te estancas. ¡La constancia es la clave!
              </p>
            </div>
          </div>

        </div>
      </main>
    </MainLayout>
  );
}
