// src/pages/Learn.jsx
import { useAuth } from '../hooks/useAuth';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import ModulePath from '../components/learn/ModulePath';
import CodyMascot from '../components/ui/CodyMascot';
import { curriculum } from '../data/curriculum';
import { Hand, Flame } from 'lucide-react';

export default function Learn() {
  const { userData } = useAuth();

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col">
      <TopBar courseTitle="Desarrollo Web" />

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Welcome banner */}
        <div className="px-4 pt-6 pb-2 max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 flex items-center justify-center">
              <CodyMascot size={32} />
            </div>
            <p className="text-text-secondary text-sm font-semibold flex items-center gap-1.5">
              Hola, <span className="text-accent-cyan">{userData?.displayName?.split(' ')[0] || 'Coder'}</span>
              <Hand size={14} className="text-accent-gold" />
            </p>
          </div>
          {userData?.streak > 0 ? (
            <p className="text-text-muted text-xs font-mono pl-11 flex items-center gap-1">
              <Flame size={12} className="text-accent-orange" />
              {userData.streak} días de racha. ¡Sigue así!
            </p>
          ) : (
            <p className="text-text-muted text-xs font-mono pl-11">¡Comienza tu primera lección hoy!</p>
          )}
        </div>

        {/* Module paths */}
        <div className="max-w-lg mx-auto">
          {curriculum.map((module) => (
            <ModulePath key={module.id} module={module} />
          ))}
        </div>

        {/* Footer padding */}
        <div className="h-8" />
      </main>

      <BottomNav />
    </div>
  );
}
