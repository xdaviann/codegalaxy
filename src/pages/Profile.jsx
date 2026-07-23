// src/pages/Profile.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { curriculum } from '../data/curriculum';
import MainLayout from '../components/layout/MainLayout';
import { LogOut, Award, BookOpen, Zap, Flame, Coins, Code2, TrendingUp, Lock, Shield } from 'lucide-react';
import { ACHIEVEMENTS } from '../firebase/firestore';

export default function Profile() {
  const { user, userData, progress, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const completedLessons = progress ? Object.values(progress).filter(p => p.completed).length : 0;
  const totalLessons = curriculum.reduce((acc, m) => acc + m.lessons.length, 0);
  const xp = userData?.xp || 0;
  const level = Math.floor(xp / 100) + 1;
  const xpInLevel = xp % 100;

  const stats = [
    { icon: Flame,    label: 'Racha',    value: `${userData?.streak || 0}d`,  color: '#f97316', bg: 'bg-orange-50',  border: 'border-orange-100' },
    { icon: Coins,    label: 'Monedas',  value: userData?.coins || 0,           color: '#eab308', bg: 'bg-yellow-50',  border: 'border-yellow-100' },
    { icon: BookOpen, label: 'Lecciones',value: `${completedLessons}/${totalLessons}`, color: '#22c55e', bg: 'bg-green-50', border: 'border-green-100' },
    { icon: Zap,      label: 'XP Total', value: xp,                             color: '#6366f1', bg: 'bg-indigo-50',  border: 'border-indigo-100' },
  ];

  return (
    <MainLayout>
      <main className="flex-1 overflow-y-auto w-full">
        <div className="max-w-4xl mx-auto px-4 md:px-8 pt-8 pb-28 lg:pb-12">
          
          {/* ── Avatar + name ─────────────────────────────────────────── */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 pt-2 pb-8 animate-fade-in-up">
            <div className="relative shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-accent flex items-center justify-center shadow-accent-md">
                {user?.photoURL
                  ? <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover rounded-3xl" />
                  : <Code2 size={48} className="text-white" strokeWidth={1.8} />}
              </div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-white rounded-xl border-2 border-accent flex items-center justify-center shadow-card">
                <span className="text-accent text-sm md:text-base font-extrabold">{level}</span>
              </div>
            </div>

            <div className="text-center md:text-left flex-1 flex flex-col justify-center">
              <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary">
                {userData?.displayName || 'Coder'}
              </h1>
              <p className="text-text-muted font-mono text-sm md:text-base mt-1 mb-4">
                @{userData?.username || user?.email?.split('@')[0] || 'coder123'}
              </p>
              
              <div className="w-full max-w-sm mx-auto md:mx-0">
                <div className="flex justify-between text-xs font-bold mb-1.5 px-1">
                  <span className="text-accent">Nivel {level}</span>
                  <span className="text-text-muted">{xpInLevel} / 100 XP</span>
                </div>
                <div className="h-3.5 bg-bg-tertiary rounded-full overflow-hidden border border-border">
                  <div 
                    className="h-full bg-accent rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${xpInLevel}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* ── Stats grid ────────────────────────────────────────────── */}
            <div className="flex flex-col gap-4 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
              <h2 className="text-text-primary font-bold text-sm md:text-base uppercase tracking-wide flex items-center gap-2">
                <TrendingUp size={18} className="text-accent" />
                Estadísticas
              </h2>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {stats.map((s, i) => (
                  <div key={i} className={`card p-4 md:p-5 flex flex-col items-center justify-center gap-2 text-center border hover:shadow-card-md transition-shadow ${s.border}`}>
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center ${s.bg}`}>
                      <s.icon size={20} color={s.color} className="md:w-6 md:h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-text-primary font-extrabold text-lg md:text-xl">{s.value}</span>
                      <span className="text-text-muted text-xs md:text-sm font-semibold">{s.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Achievements (Logros) ───────────────────────────── */}
            <div className="flex flex-col gap-4 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
              <h2 className="text-text-primary font-bold text-sm md:text-base uppercase tracking-wide flex items-center gap-2">
                <Award size={18} className="text-accent-gold" />
                Medallas y Logros
              </h2>
              
              <div className="flex flex-col gap-3">
                {ACHIEVEMENTS.map((ach) => {
                  const isUnlocked = userData?.unlockedAchievements?.includes(ach.id);
                  const Icon = {
                    Zap: Zap,
                    Flame: Flame,
                    Award: Award,
                    Shield: Shield,
                    BookOpen: BookOpen
                  }[ach.icon] || Award;
                  
                  // Compute custom progress
                  let progressInfo = { current: 0, total: 1, percent: 0, text: '' };
                  if (ach.id === 'ACH_FIRST') {
                    const completedAny = progress ? Object.values(progress).some(p => p.roundsCompleted > 0 || p.completed) : false;
                    progressInfo = {
                      current: completedAny ? 1 : 0,
                      total: 1,
                      percent: completedAny ? 100 : 0,
                      text: completedAny ? '¡Completado!' : 'Completa tu primera ronda'
                    };
                  } else if (ach.id === 'ACH_STREAK_3') {
                    const streak3 = userData?.streak || 0;
                    progressInfo = {
                      current: Math.min(streak3, 3),
                      total: 3,
                      percent: Math.min(Math.round((streak3 / 3) * 100), 100),
                      text: `Racha actual: ${streak3}/3 días`
                    };
                  } else if (ach.id === 'ACH_STREAK_7') {
                    const streak7 = userData?.streak || 0;
                    progressInfo = {
                      current: Math.min(streak7, 7),
                      total: 7,
                      percent: Math.min(Math.round((streak7 / 7) * 100), 100),
                      text: `Racha actual: ${streak7}/7 días`
                    };
                  } else if (ach.id === 'ACH_PERFECT') {
                    const maxAccuracy = progress ? Math.max(0, ...Object.values(progress).map(p => p.score || 0)) : 0;
                    progressInfo = {
                      current: maxAccuracy,
                      total: 100,
                      percent: maxAccuracy,
                      text: `Precisión máxima: ${maxAccuracy}/100%`
                    };
                  } else if (ach.id === 'ACH_SHIELD') {
                    const hasShield = (userData?.streakShields || 0) > 0 || userData?.boughtShieldOnce === true;
                    progressInfo = {
                      current: hasShield ? 1 : 0,
                      total: 1,
                      percent: hasShield ? 100 : 0,
                      text: hasShield ? '¡Escudo comprado!' : 'Visita la tienda y equípalo'
                    };
                  } else if (ach.id === 'ACH_MODULES') {
                    const htmlLessonsList = ['html-1-1', 'html-1-2', 'html-1-3', 'html-1-4'];
                    const cssLessonsList = ['css-1-1', 'css-1-2', 'css-1-3'];
                    const htmlComp = progress ? htmlLessonsList.filter(id => progress[id]?.completed).length : 0;
                    const cssComp = progress ? cssLessonsList.filter(id => progress[id]?.completed).length : 0;
                    const maxComp = Math.max(htmlComp, cssComp);
                    const target = maxComp === cssComp ? 3 : 4;
                    progressInfo = {
                      current: maxComp,
                      total: target,
                      percent: Math.round((maxComp / target) * 100),
                      text: `Progreso módulo: ${maxComp}/${target} lecciones`
                    };
                  }

                  return (
                    <div 
                      key={ach.id}
                      className={`card p-4 flex gap-4 items-center border transition-all duration-300 ${
                        isUnlocked 
                          ? `bg-gradient-to-r from-accent/5 to-white border-accent-light shadow-sm hover:shadow-md` 
                          : 'bg-white/40 border-border opacity-75'
                      }`}
                    >
                      {/* Icon Badge */}
                      <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                        isUnlocked 
                          ? `bg-gradient-to-tr ${ach.gradient} text-white shadow-accent-sm` 
                          : 'bg-bg-tertiary text-text-muted border border-border/80'
                      }`}>
                        <Icon size={24} className={isUnlocked ? 'animate-pulse-slow' : ''} />
                        {!isUnlocked && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white border border-border rounded-lg flex items-center justify-center text-text-muted shadow-sm">
                            <Lock size={10} />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-extrabold text-sm md:text-base text-text-primary truncate">
                            {ach.title}
                          </h3>
                          {isUnlocked && (
                            <span className="shrink-0 text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                              Reclamado
                            </span>
                          )}
                        </div>
                        
                        <p className="text-text-muted text-xs leading-normal mt-0.5">
                          {ach.description}
                        </p>

                        {/* Progress Bar for Locked / Active state */}
                        <div className="mt-2.5">
                          <div className="flex justify-between text-[10px] font-bold text-text-muted mb-1">
                            <span>{progressInfo.text}</span>
                            <span>{progressInfo.percent}%</span>
                          </div>
                          <div className="h-1.5 bg-bg-tertiary rounded-full overflow-hidden border border-border/50">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                                isUnlocked ? 'bg-gradient-to-r from-accent to-accent-light' : 'bg-text-muted/40'
                              }`}
                              style={{ width: `${progressInfo.percent}%` }}
                            />
                          </div>
                        </div>

                        {/* Rewards info if locked */}
                        {!isUnlocked && (
                          <div className="flex items-center gap-1.5 mt-2">
                            <span className="text-[10px] font-bold text-text-muted">Recompensa:</span>
                            <div className="flex gap-1">
                              <span className="text-[10px] font-extrabold bg-indigo-50 text-indigo-600 border border-indigo-100 px-1.5 py-0.5 rounded">
                                +{ach.xpReward} XP
                              </span>
                              <span className="text-[10px] font-extrabold bg-yellow-50 text-yellow-700 border border-yellow-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                <Coins size={8} className="text-accent-gold" />
                                +{ach.coinsReward}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="h-8" />
          
          {/* Mobile logout (Desktop has it in sidebar) */}
          <div className="md:hidden">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-accent-red font-bold bg-red-50 hover:bg-red-100 transition-colors"
            >
              <LogOut size={18} />
              Cerrar sesión
            </button>
            <div className="h-6" />
          </div>

        </div>
      </main>
    </MainLayout>
  );
}
