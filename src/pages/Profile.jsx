// src/pages/Profile.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { curriculum } from '../data/curriculum';
import MainLayout from '../components/layout/MainLayout';
import { LogOut, Award, BookOpen, Zap, Flame, Coins, Code2, TrendingUp } from 'lucide-react';

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

            {/* ── Achievements (placeholder) ───────────────────────────── */}
            <div className="flex flex-col gap-4 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
              <h2 className="text-text-primary font-bold text-sm md:text-base uppercase tracking-wide flex items-center gap-2">
                <Award size={18} className="text-accent-gold" />
                Logros Recientes
              </h2>
              <div className="card p-6 border-dashed flex flex-col items-center justify-center text-center gap-3 h-full min-h-[200px] bg-white/50">
                <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center">
                  <Award size={24} className="text-accent-gold opacity-50" />
                </div>
                <div>
                  <p className="text-text-primary font-bold text-base">Aún no hay logros</p>
                  <p className="text-text-muted text-sm mt-1">Completa más módulos para desbloquear medallas.</p>
                </div>
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
