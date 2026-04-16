// src/pages/Profile.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { curriculum, getModuleProgress } from '../data/curriculum';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import CodyMascot from '../components/ui/CodyMascot';
import ModuleIcon from '../components/ui/ModuleIcon';
import { LogOut, Award, BookOpen, Zap, Flame, Coins } from 'lucide-react';

export default function Profile() {
  const { user, userData, progress, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const completedLessons = Object.values(progress).filter((p) => p.completed).length;
  const totalLessons = curriculum.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col">
      <TopBar />
      <main className="flex-1 overflow-y-auto pb-24 px-4 max-w-lg mx-auto w-full">
        {/* Profile header */}
        <div className="flex flex-col items-center gap-4 pt-8 pb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-bg-tertiary border-2 border-accent-cyan flex items-center justify-center overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <CodyMascot size={60} />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-accent-cyan rounded-full flex items-center justify-center">
              <span className="text-bg-primary text-xs font-bold">
                {Math.floor((userData?.xp || 0) / 100) + 1}
              </span>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-text-primary text-xl font-bold">
              {userData?.displayName || 'Coder'}
            </h2>
            <p className="text-text-muted text-sm font-mono">{user?.email}</p>
          </div>

          {/* XP Bar */}
          <div className="w-full">
            <div className="flex justify-between text-xs text-text-muted font-semibold mb-1.5">
              <span>Nivel {Math.floor((userData?.xp || 0) / 100) + 1}</span>
              <span>{userData?.xp || 0} XP</span>
            </div>
            <div className="w-full h-3 bg-bg-tertiary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-cyan rounded-full transition-all duration-700"
                style={{ width: `${((userData?.xp || 0) % 100)}%` }}
              />
            </div>
            <p className="text-text-muted text-xs text-right mt-1 font-mono">
              {100 - ((userData?.xp || 0) % 100)} XP para nivel {Math.floor((userData?.xp || 0) / 100) + 2}
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="card p-4 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Flame size={18} className="text-accent-orange fill-accent-orange" />
              <span className="text-text-muted text-xs font-semibold">Racha actual</span>
            </div>
            <span className="text-text-primary text-2xl font-bold">{userData?.streak || 0} días</span>
          </div>
          <div className="card p-4 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Coins size={18} className="text-accent-gold" />
              <span className="text-text-muted text-xs font-semibold">Monedas</span>
            </div>
            <span className="text-text-primary text-2xl font-bold">{userData?.coins || 0}</span>
          </div>
          <div className="card p-4 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-accent-cyan" />
              <span className="text-text-muted text-xs font-semibold">Lecciones</span>
            </div>
            <span className="text-text-primary text-2xl font-bold">
              {completedLessons}/{totalLessons}
            </span>
          </div>
          <div className="card p-4 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-accent-gold" />
              <span className="text-text-muted text-xs font-semibold">XP Total</span>
            </div>
            <span className="text-text-primary text-2xl font-bold">{userData?.xp || 0}</span>
          </div>
        </div>

        {/* Module progress */}
        <div className="mb-6">
          <h3 className="text-text-primary font-bold text-base mb-3 flex items-center gap-2">
            <Award size={18} className="text-accent-cyan" />
            Progreso por módulo
          </h3>
          <div className="flex flex-col gap-3">
            {curriculum.filter((m) => !m.locked).map((module) => {
              const pct = getModuleProgress(module.id, progress);
              return (
                <div key={module.id} className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${module.color}22` }}
                      >
                        <ModuleIcon language={module.language} size={16} color={module.color} />
                      </div>
                      <span className="text-text-primary font-semibold text-sm">{module.title}</span>
                    </div>
                    <span className="text-text-muted text-xs font-mono font-bold">{pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: module.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Logout */}
        <button
          id="logout-btn"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-accent-red/40 text-accent-red font-bold hover:bg-accent-red/10 transition-colors"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </main>
      <BottomNav />
    </div>
  );
}
